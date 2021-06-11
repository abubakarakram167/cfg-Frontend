import React, {useState, useEffect} from 'react';
import {
  makeStyles,
  Modal,
  TextField,
  Button,
  withStyles,
  Switch,
} from '@material-ui/core';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PublishIcon from '@material-ui/icons/Publish';
import AdminHeader from 'pages/admin-header';
import QuizModal from './AddModal';
import AddNewQuestion from './AddNewQuestion';
import {useDispatch, useSelector} from 'react-redux';
import AddFromBank from './AddFromBank';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import jsCookie from 'js-cookie';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import {Show_Message} from '../../shared/constants/ActionTypes';
import './content.css';
import {
  addQuestionaire,
  addAnswer,
  addQuizQuestions,
  getQuestionAllOptions,
  editQuestion,
  editQuestionOptions,
  getAllBankQuestions,
  getQuizAllQuestions,
  getBankQuestionOptions,
  deleteQuestionOption,
  deleteBankQuestion,
} from '../../redux/actions/quiz';
import {EditorState} from 'draft-js';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {showMessage} from 'redux/actions';

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [renderQuestions, setRenderQuestions] = useState([]);
  const [openNew, setOpenNew] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [selected, setSelected] = useState(null);
  const [allQuestionoptions, setAllQuestionsOptions] = useState([]);
  const createdBy = JSON.parse(jsCookie.get('user')).id;
  const [open1, setOpen1] = useState(false);
  const userList = useSelector((state) => state.userList);
  const quiz = useSelector((state) => state.quiz);

  const [editorState, setEditorState] = useState(
    EditorState.createWithText(''),
  );
  const [detail, setDetail] = useState('');

  const handleClose1 = () => {
    setOpen1(false);
  };

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
      question: e.question,
      detail: e.questionDetail,
      is_deleted: false,
      bank: e.isAddToBank,
      new: true,
      answers: [],
    };
    const isDuplicateQuestion = verifyDuplicateQuestion([newQuestion]);
    if (!isDuplicateQuestion) {
      setRenderQuestions([...questions, newQuestion]);
      setQuestions([...questions, newQuestion]);
    } else
      showMessageWarning(
        'The Question you trying to add is already added with the title.Please Use another one.',
      );
  };

  const handleImport = async (e) => {
    let allOptions = [];
    for (let question of e) {
      allOptions.push(getBankQuestionOptions(question.id));
    }
    let allOptionsResolved = await Promise.all(allOptions);
    let allOptionsMerge = [];

    allOptionsResolved.map((optionsPerQuestions) => {
      optionsPerQuestions.map((option) => {
        allOptionsMerge.push({
          ...option,
          option: option.option_description,
          points: option.score,
        });
      });
    });

    const newImportQuestions = e.map((question) => {
      const transformQuestion = {
        ...question,
        new: true,
        answers: allOptionsMerge.filter(
          (option) => option.question_id === question.id,
        ),
        bank: false,
      };
      delete transformQuestion.id;
      return transformQuestion;
    });

    const isDuplicateQuestion = verifyDuplicateQuestion(newImportQuestions);
    if (!isDuplicateQuestion) {
      const allQuestions = questions.concat(newImportQuestions);
      setQuestions(allQuestions);
      setRenderQuestions(allQuestions);
    } else {
      showMessageWarning(
        'The Question you trying to import is already added with the title.Please Use another one.',
      );
    }
  };

  const verifyDuplicateQuestion = (questionsNew) => {
    const allQuestions = questions.map((question) => question.question);
    let duplicate = false;
    for (let question of questionsNew) {
      if (allQuestions.includes(question.question)) duplicate = true;
    }
    return duplicate;
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
    newArr[index].edit = true;
    deleteQuestionOption(e.id).then((res) => {
      setQuestions(newArr);
      setSelected(newArr[index]);
      setRenderQuestions(newArr);
      showMessage('Option Deleted Successfully');
    });
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

    let allOptions = allQuestionoptions.map((option) => {
      let specificOption = q.answers.filter(
        (specific) => specific.id === option.id,
      )[0];
      if (option.id === specificOption && specificOption.id) {
        return {
          ...option,
          points: e,
        };
      } else return option;
    });

    setAllQuestionsOptions(allOptions);
    q.answers[i].points = e;
    setSelected(q);
    newArr[index] = q;
    setQuestions(newArr);
    setRenderQuestions(newArr);
  };

  const showMessage = (message) => {
    setTimeout(() => {
      dispatch({
        type: Show_Message,
        payload: {message: null, success: false},
      });
      setSelected(null);
    }, 2000);
    dispatch({
      type: Show_Message,
      payload: {message: message, success: true},
    });
  };

  const showMessageWarning = (message) => {
    setTimeout(() => {
      dispatch({
        type: Show_Message,
        payload: {message: null, success: false},
      });
      setSelected(null);
    }, 3000);
    dispatch({
      type: Show_Message,
      payload: {message: message, success: false},
    });
  };

  const handlePublish = () => {
    console.log('the render', renderQuestions);
    renderQuestions.forEach((q) => {
      let points = [];
      q.answers.forEach((a) => {
        points.push(a.points);
      });
      if (q.new) {
        addQuestionaire(q)
          .then((res) => {
            console.log('the question add', res);
            addQuizQuestions({
              quiz_id: getQuizParams(),
              question_id: res.id,
              created_by: createdBy,
            }).then((response) => {
              console.log('afterquestion add to quiz', response);
              q.answers.forEach((a, i) => {
                const toAddAnswer = {
                  option_description: a.option,
                  question_id: res.id,
                  score: a.points,
                  sequence_order: i,
                };
                if (q.bank) toAddAnswer.bank_id = res.bank_id;
                addAnswer(toAddAnswer);
              });
              showMessage('Added SuccessFully');
            });
          })
          .catch((err) => {
            console.log('the err...', err);
          });
      } else {
        if (q.edit) {
          let questionToBeEdit = q;
          editQuestion({
            questionId: questionToBeEdit.quiz_questions.question_id,
            detail: questionToBeEdit.detail,
            answers: questionToBeEdit.answers,
            question: questionToBeEdit.question,
            is_deleted: q.deleted,
          }).then((response) => {
            q.answers.forEach((a, i) => {
              if (a.id) {
                editQuestionOptions({
                  option_description: a.option,
                  question_id: questionToBeEdit.quiz_questions.question_id,
                  score: a.points,
                  sequence_order: a.sequence_order,
                  optionId: a.id,
                });
              } else {
                addAnswer({
                  option_description: a.option,
                  question_id: questionToBeEdit.quiz_questions.question_id,
                  score: a.points,
                  sequence_order: i,
                });
              }
            });
            showMessage('Edit SuccessFully');
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
    dispatch(getAllBankQuestions());
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      let questions = await getQuizAllQuestions(parseInt(getQuizParams()));
      let allOptions = [];
      console.log('the questions', questions);

      if (questions !== '') {
        for (let question of questions.questions)
          allOptions.push(getQuestionAllOptions(question.id));
        const allOptionsResolved = await Promise.all(allOptions);
        let allOptionsMerge = [];

        allOptionsResolved.map((optionsPerQuestions) => {
          optionsPerQuestions.map((option) => {
            allOptionsMerge.push(option);
          });
        });

        setAllQuestionsOptions(allOptionsMerge);

        const hardCodeOptionsWithQuestion =
          questions && questions.questions && questions.questions.length
            ? questions.questions.map((question) => {
                console.log('the question', question);
                const options = allOptionsMerge
                  .filter((option) => {
                    return option.question_id === question.id;
                  })
                  .map((optionValue) => {
                    return {
                      option: optionValue.option_description,
                      points: optionValue.score,
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

        setRenderQuestions(hardCodeOptionsWithQuestion);
        setQuestions(hardCodeOptionsWithQuestion);
      }
    };
    getQuestions();
  }, []);

  const addNewAnswer = () => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    if (selected.answers.length < 4) {
      let temp = {...selected};
      temp.answers.push({option: '', points: 0});
      setAllQuestionsOptions([...allQuestionoptions, {option: '', points: 0}]);
      setSelected(temp);
      newArr[index] = temp;
      setQuestions(newArr);
      setRenderQuestions(newArr);
    }
  };

  const setDetailForQuestion = (data) => {
    let newArr = [...questions];
    let index = newArr.indexOf(selected);
    let q = {...selected};
    q.detail = data;
    newArr[index] = q;
    setSelected(q);
    setRenderQuestions(newArr);
    setQuestions(newArr);
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
      <Snackbar
        open={userList.message}
        autoHideDuration={2000}
        onClose={handleClose1}>
        <Alert
          variant='filled'
          onClose={handleClose1}
          severity={userList.success ? 'success' : 'error'}>
          {userList.message}
        </Alert>
      </Snackbar>
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
              style={{
                backgroundColor: 'red',
                marginLeft: 10,
                fontSize: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
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
              Add question from Bank
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
        </div>
        <QuizModal
          style={{padding: 20}}
          open={openNew}
          onClose={handleClose}
          title='Add New Question'>
          <AddNewQuestion
            onSave={(question) => handleAddNewQuestion(question)}
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
            bankQuestions={quiz.allBankQuestions}
            quizName={getQuizName()}
            onDelete={async (bankQuestion) => {
              let allBankSelectedQuestions = [];
              for (let question of bankQuestion)
                allBankSelectedQuestions.push(deleteBankQuestion(question.id));
              await Promise.all(allBankSelectedQuestions);
              showMessage('Questions From Bank Deleted');
            }}
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
                          setContents={q.detail}
                          defaultValue={q.detail}
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
                            ],
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
                          onChange={(e) => setDetailForQuestion(e)}
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
