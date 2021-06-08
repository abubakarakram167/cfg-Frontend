import React, {useState, useEffect} from 'react';
import {
  makeStyles,
  Modal,
  TextField,
  Button,
  withStyles,
} from '@material-ui/core';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PublishIcon from '@material-ui/icons/Publish';
import AdminHeader from 'pages/admin-header';
import QuizModal from './AddModal';
import AddNewQuestion from './AddNewQuestion';
import AddFromBank from './AddFromBank';
import _ from 'lodash';
import draftToHtml from 'draftjs-to-html';
import {Link} from 'react-router-dom';
import jsCookie from 'js-cookie';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import history from '../../utils/history';
import './content.css';
import {
  addQuestionaire,
  addAnswer,
  addQuizQuestions,
  getQuestionAllOptions,
  editQuestion,
} from '../../redux/actions/quiz';
import {getQuizAllQuestions} from '../../redux/actions/quiz';
import moment from 'moment';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const StyledTableTextfiled = withStyles((theme) => ({
  root: {
    width: '80%',
    padding: 0,
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  questionTitle: {
    marginBottom: '20px',
    paddingTop: 0,
  },
  actions: {
    maxWidth: '170px',
    display: 'flex',
    justifyContent: 'space-evenly',
    fontSize: '1.5rem',
    color: '#0c63e4',
    alignItems: 'center',
  },
  question: {
    width: 'fit-content',
    marginLeft: 20,
    paddingTop: 5,
    color: 'gray',
  },
  answer: {
    backgroundColor: 'white',
  },
  points: {
    maxWidth: '150px',
    marginLeft: '20px',
    backgroundColor: 'white',
  },
  questionCard: {
    backgroundColor: '#f6f6f6',
    fontSize: '1.3rem',
    padding: '15px',
    border: '1px solid grey',
    width: '100%',
    // marginBottom:'10px'
  },
  editSection: {
    border: '1px solid grey',
    padding: '25px',
  },
  button: {
    borderRadius: '25px',
    marginRight: '15px',
    fontSize: 10,
  },
  answerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '330px',
    margin: '25px 0',
  },
  customTextField: {
    '& .MuiInputBase-formControl': {
      paddingTop: 0,
    },
  },
}));

const QuizContentScreen = (props) => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [renderQuestions, setRenderQuestions] = useState([]);
  const [openNew, setOpenNew] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState('');
  const createdBy = JSON.parse(jsCookie.get('user')).id;

  const [editorState, setEditorState] = useState(
    EditorState.createWithText(''),
  );

  const [detail, setDetail] = useState('');
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleOpenImport = () => {
    setOpenImport(true);
  };

  const handleClose = () => {
    setOpenImport(false);
    setOpenNew(false);
  };

  const handleDelete = (e) => {
    // let temp = _.difference(questions, [e]);
    // setQuestions(temp);
    let newArr = [...questions];
    let index = newArr.indexOf(e);
    let q = {...e};
    q.deleted = true;
    q.edit = true;
    setSelected(q);
    newArr[index] = q;
    setQuestions(newArr);
    setRenderQuestions(newArr);
  };

  const handleAddNewQuestion = (e) => {
    let newQuestion = {
      question: '',
      new: true,
      edit: false,
      answers: [],
      id: questions.length + 1,
    };
    newQuestion.question = e;
    let temp = [...questions];
    temp.push(newQuestion);
    setQuestions(temp);
    setRenderQuestions(temp);
    // addQuestionaire({question:e,correct_answer:10,deleted:0})
  };
  const handleImport = (e) => {
    console.log('the e', e);
    const newImportQuestions = e.map((option) => {
      return {
        ...option,
        new: true,
      };
    });
    setQuestions([...questions, ...newImportQuestions]);
    setRenderQuestions([...questions, ...newImportQuestions]);
  };

  const handleEdit = (e) => {
    setSelected(e);
    if (!e.new) e.edit = true;
    setDetail(e.detail);
    if (!selected) setSelected(e);
    else {
      if (e.id === selected.id) setSelected(null);
    }
  };
  const handleAnswerDelete = (e, i) => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    newArr[index].answers.splice(i, 1);
    setQuestions(newArr);
    setSelected(newArr[index]);
    setRenderQuestions(newArr);
  };

  const handleAnswerChange = (e, i) => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    let q = {...selected};
    setSelected(q);
    q.answers[i].option = e;
    newArr[index] = q;
    setQuestions(newArr);
    setRenderQuestions(newArr);
  };

  const handlePointsChange = (e, i) => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    let q = {...selected};
    q.answers[i].points = e;
    setSelected(q);
    newArr[index] = q;
    setQuestions(newArr);
    setRenderQuestions(newArr);
  };

  const handlePublish = () => {
    console.log('the render questions', renderQuestions);
    renderQuestions.forEach((q) => {
      let points = [];
      q.answers.forEach((a) => {
        points.push(a.points);
      });
      if (q.new) {
        addQuestionaire({
          question: q.question,
          correct_answer:
            points.length > 0
              ? parseInt(points.sort((a, b) => b - a)[0], 10)
              : 0,
          deleted: 0,
          detail,
        }).then((res) => {
          addQuizQuestions({
            quiz_id: getQuizParams(),
            question_id: res.id,
            created_by: createdBy,
            updated_at: moment(),
            created_at: moment(),
            deleted: false,
            detail,
          });
          q.answers.forEach((a, i) => {
            addAnswer({
              option_description: a.option,
              question_id: res.id,
              is_answer:
                a.points == parseInt(points.sort((a, b) => b - a)[0], 10)
                  ? 1
                  : 0,
              sequence_order: i,
            });
          });
        });
      } else {
        if (q.edit) {
          let questionToBeEdit = q;
          editQuestion({
            questionId: questionToBeEdit.quiz_questions.question_id,
            detail: questionToBeEdit.detail,
            answers: questionToBeEdit.answers,
            question: questionToBeEdit.question,
            deleted: q.deleted,
          });
        }
      }
    });
  };

  const getQuizParams = () => {
    var url = new URL(document.URL);
    return url.searchParams.get('quiz_id');
  };
  const getQuizName = () => {
    var url = new URL(document.URL);
    return url.searchParams.get('quiz_name');
  };

  useEffect(() => {
    const getQuestions = async () => {
      let questions = await getQuizAllQuestions(parseInt(getQuizParams()));
      console.log('the questions get', questions);
      const questionAllOptions = await getQuestionAllOptions();
      const hardCodeOptionsWithQuestion =
        questions && questions.questions && questions.questions.length
          ? questions.questions.map((question) => {
              const options = questionAllOptions
                .filter((option) => {
                  return option.question_id === question.id;
                })
                .map((optionValue) => {
                  return {
                    option: optionValue.option_description,
                    points: Math.floor(Math.random() * 10) + 1,
                    id: optionValue.id,
                  };
                });
              return {
                ...question,
                answers: options,
                new: false,
                edit: false,
              };
            })
          : [];

      setQuestions(hardCodeOptionsWithQuestion);
    };
    getQuestions();
  }, []);

  const addNewAnswer = () => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    if (selected.answers.length < 4) {
      let temp = {...selected};
      temp.answers.push({option: '', points: 0});
      setSelected(temp);
      newArr[index] = temp;
      setQuestions(newArr);
      setRenderQuestions(newArr);
    }
  };

  const handleEditorChange = (e) => {
    setContent(e);
  };

  const onEditorStateChange = (editorState) => {
    console.log(
      'style',
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
    console.log('convertFromHTML', editorState.getCurrentInlineStyle());
    // console.log("convertFromHTML", editorState.getCurrentContent().getPlainText())
    console.log(
      'object',
      convertFromRaw(convertToRaw(editorState.getCurrentContent())),
    );
    setEditorState(editorState);
    setDetail(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const setDetailForQuestion = (data) => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    let q = {...selected};
    q.detail = data;
    // setSelected(q);
    newArr[index] = q;
    setRenderQuestions(newArr);
    // setQuestions(newArr)
    setDetail(data);
  };

  const onChangeQuestionText = (text) => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    let q = {...selected};
    q.question = text.target.value;
    setSelected(q);
    newArr[index] = q;
    setQuestions(newArr);
    setRenderQuestions(newArr);
  };

  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <div className='container-fluid dash-wrapper'>
        <div className='row dash-session-header'>
          <div className='col-md-8'>
            <label
              style={{fontSize: '1rem', fontWeight: 700, color: '#565454'}}>
              {getQuizName()}
            </label>
            <Button
              variant='contained'
              onClick={() => handleOpenNew()}
              style={{backgroundColor: 'red', marginLeft: 10, fontSize: 10}}
              color='secondary'
              className={classes.button}
              startIcon={<AddCircleOutlinedIcon />}>
              Add new questions
            </Button>

            <Button
              variant='contained'
              onClick={() => handleOpenImport()}
              style={{backgroundColor: 'grey', padding: 10, fontSize: 10}}
              color='secondary'
              className={classes.button}
              startIcon={<AddCircleOutlinedIcon />}>
              Add question from questions
            </Button>
          </div>
          <div className='col-md-4'>
            <div
              className='flex-buttons-publish'
              style={{justifyContent: 'flex-end'}}>
              <Link
                to={`/preview/quiz?quiz_id=${getQuizParams()}&quiz_name=${getQuizName()}`}>
                <button className='flex-button preview'>
                  {' '}
                  <VisibilityIcon style={{fill: '#ffffff'}} />{' '}
                  <span className='button-text'>Preview</span>
                </button>
              </Link>
              <button
                className='flex-button publish'
                onClick={() => handlePublish()}>
                <PublishIcon style={{fill: '#ffffff'}} />{' '}
                <span className='button-text'>Publish</span>
              </button>
            </div>
          </div>
          {/* <div className='col-md-4' style={{textAlign: 'right'}}>
            <button
              style={{
                padding: '7px 0',
                paddingLeft: '25px',
                paddingRight: '25px',
              }}
              className='button-title button_inline'
              onClick={() => {
                history.push(
                  `/preview/quiz?quiz_id=${getQuizParams()}&quiz_name=${getQuizName()}`,
                );
              }}>
              <i className='fas fa-eye' /> preview
            </button>
            <div className='btn-group'>
              <button
                onClick={() => handlePublish()}
                type='button'
                className='btn btn-danger'
                style={{
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '25px',
                  padding: '7px 0',
                  paddingLeft: '25px',
                  paddingRight: '5px',
                  backgroundColor: 'red',
                  marginLeft: 20,
                }}>
                <i className='fas fa-upload' /> Publish
              </button>
              <button
                type='button'
                className='btn btn-danger dropdown-toggle dropdown-toggle-split'
                style={{
                  paddingRight: '25px',
                  borderBottomRightRadius: '25px',
                  borderTopRightRadius: '25px',
                  borderLeft: '1px solid white',
                  backgroundColor: 'red',
                }}
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                <span style={{fontSize: 20}} className='sr-only'>
                  Toggle Dropdown
                </span>
              </button>
              <div className='dropdown-menu'>
                <a className='dropdown-item' href='#'>
                  Action
                </a>
                <a className='dropdown-item' href='#'>
                  Another action
                </a>
                <a className='dropdown-item' href='#'>
                  Something else here
                </a>
                <div className='dropdown-divider' />
                <a className='dropdown-item' href='#'>
                  Separated link
                </a>
              </div>
            </div>
          </div> */}
        </div>
        <QuizModal
          style={{padding: 20}}
          open={openNew}
          onClose={handleClose}
          title='Add New Question'>
          <AddNewQuestion
            onSave={(e) => handleAddNewQuestion(e)}
            onClose={handleClose}
          />
        </QuizModal>

        <QuizModal
          open={openImport}
          onClose={handleClose}
          title='Add Question From Question Bank'>
          <AddFromBank
            onImport={(e) => handleImport(e)}
            onClose={handleClose}
          />
        </QuizModal>
        <div style={{marginTop: 30, width: '100%'}} className='row'>
          {questions &&
            questions.map((q) => {
              if (!q.deleted) {
                return (
                  <div style={{marginBottom: '10px', width: '100%'}}>
                    <div className={classes.questionCard}>
                      <div className='row'>
                        <div className={classes.actions}>
                          {/* <i
                            className='fas fa-edit'
                            onClick={() => handleEdit(q)}
                          />
                          <i className='fas fa-copy' />
                          <i
                            className='fas fa-trash'
                            style={{color: '#EB1B29'}}
                            onClick={() => handleDelete(q)}
                          /> */}
                          <span
                            className='question-icons'
                            onClick={() => handleEdit(q)}>
                            <EditIcon style={{fill: 'blue', fontSize: 23}} />
                          </span>
                          <span className='question-icons'>
                            <FileCopyIcon
                              style={{fill: 'blue', fontSize: 23}}
                            />
                          </span>
                          <span
                            onClick={() => handleDelete(q)}
                            className='question-icons last-icon'>
                            <DeleteIcon
                              onClick={() => handleDelete(q)}
                              style={{fill: 'red', fontSize: 25}}
                            />
                          </span>
                        </div>
                        <div className={classes.question}>{q.question}</div>
                      </div>
                    </div>
                    {q == selected && (
                      <div className={classes.editSection}>
                        <TextField
                          className={[
                            classes.questionTitle,
                            classes.customTextField,
                          ]}
                          id='outlined-basic'
                          variant='outlined'
                          inputProps={{style: {fontSize: '1.3rem'}}}
                          fullWidth
                          defaultValue={q.question}
                          onChange={(text) => {
                            onChangeQuestionText(text);
                          }}
                        />
                        <SunEditor
                          setContents={content}
                          defaultValue=''
                          setOptions={{
                            height: 430,
                            buttonList: [
                              ['bold', 'italic', 'underline'],
                              ['indent', 'outdent'],
                              ['list'],
                              ['fontColor'],
                              ['fontSize'],
                              ['font', 'align'],
                              ['video', 'image'],
                              ['imageGallery'],
                            ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                            font: [
                              'Arial',
                              'Gotham',
                              'Rissa',
                              'Angelina',
                              'courier',
                              'impact',
                              'verdana',
                              'georgia',
                            ],
                            plugins: ['image'],
                            imageUploadSizeLimit: 500000,
                          }}
                          onChange={handleEditorChange}
                        />
                        <div className={classes.answerHeader}>
                          <h3>Answers</h3>{' '}
                          <Button
                            variant='contained'
                            style={{backgroundColor: 'red'}}
                            color='secondary'
                            className={classes.button}
                            startIcon={<AddCircleOutlinedIcon />}
                            onClick={() => addNewAnswer()}>
                            ADD NEW ANSWER
                          </Button>
                        </div>

                        {q.answers.map((a, i) => (
                          <div style={{padding: '10px'}}>
                            <div
                              className={classes.questionCard}
                              style={{border: 'none'}}>
                              <div className='row'>
                                <div
                                  className={classes.actions}
                                  style={{maxWidth: '50px'}}
                                  onClick={() => handleAnswerDelete(a, i)}>
                                  <DeleteIcon
                                    onClick={() => handleDelete(q)}
                                    style={{fill: 'red', fontSize: 25}}
                                  />
                                </div>
                                <StyledTableTextfiled
                                  value={a.option}
                                  fullWidth
                                  onChange={(e) =>
                                    handleAnswerChange(e.target.value, i)
                                  }
                                  variant='outlined'
                                />
                                <TextField
                                  className={classes.points}
                                  value={a.points}
                                  onChange={(e) =>
                                    handlePointsChange(e.target.value, i)
                                  }
                                  type='number'
                                  variant='outlined'
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default QuizContentScreen;
