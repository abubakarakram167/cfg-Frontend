import React, {useState, useEffect} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AdminHeader from 'pages/admin-header';
import {
  getQuizAllQuestions,
  getQuestionAllOptions,
} from '../../redux/actions/quiz';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import './toolbar.css';
import './previewQuiz.css';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '25px',
    marginRight: '15px',
    fontSize: '12px',
    float: 'right',
    padding: '6px 18px',
    backgroundColor: 'grey',
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
}));

const PreviewQuizScreen = ({data}) => {
  const classes = useStyles();
  const [questions, setQuestions] = useState(null);
  const [attempt, setAttempt] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [allQuestionoptions, setAllQuestionsOptions] = useState([]);
  const [renderQuestions, setRenderQuestions] = useState([]);

  const handleChoose = (e) => {
    setAttempt({...attempt, [currentQuestion]: e.value});
  };
  const handleFinish = () => {
    console.log(attempt);
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
      console.log('the all Questions', questions);
      let allOptions = [];
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
        console.log('the all hardcoded', hardCodeOptionsWithQuestion);
        setRenderQuestions(hardCodeOptionsWithQuestion);
        setQuestions(hardCodeOptionsWithQuestion);
      }
    };

    getQuestions();
  }, []);

  const handleCurrentQuestion = (e) => {
    setCurrentQuestion(e);
  };

  const getAlphabets = (i) => {
    let alphabet;
    if (i === 0) alphabet = 'A';
    else if (i === 1) alphabet = 'B';
    else if (i === 2) alphabet = 'C';
    else alphabet = 'D';
    return alphabet;
  };

  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <div
        className='row preview-questions-grid'
        style={{margin: 'auto', width: '50%'}}>
        <div className='view-questions-box'>
          <div className='view-questions-box-title'>{getQuizName()}</div>
          <div className='questions-list'>
            {questions &&
              questions.map((q, i) => (
                <div
                  className='view-question'
                  onMouseEnter={() => handleCurrentQuestion(q.id)}>
                  <div
                    style={{marginBottom: 30}}
                    className='view-questions-title'>
                    {i + 1}. {q.question}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 30,
                    }}>
                    {q.answers.map((a, i) => (
                      <button
                        className='view-questions-option'
                        style={{
                          textAlign: 'left',
                          backgroundColor:
                            attempt[q.id] == a ? 'lightgrey' : 'transparent',
                        }}
                        name={q.question}
                        value={a}
                        onClick={(e) => handleChoose(e.target)}>
                        {getAlphabets(i)}. {a.option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div style={{margin: '20px 0', width: '100%'}}>
          <Button
            onClick={handleFinish}
            variant='contained'
            color='secondary'
            className={classes.button}
            startIcon={<CheckCircleIcon />}>
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewQuizScreen;
