import React, {useState, useEffect} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  getQuizAllQuestions,
  getQuestionAllOptions,
} from '../../redux/actions/quiz';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import './toolbar.css';
// i

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

  const dummyData = [
    {
      id: 0,
      question: 'What is MIndfullness?',
      answers: [
        'This is Option One',
        'This is B Option',
        'This is C option',
        'This is D Option',
      ],
    },
    {
      id: 1,
      question: 'What is It?',
      answers: [
        'This is Option One',
        'This is B Option',
        'This is C option',
        'This is D Option',
      ],
    },
    {
      id: 2,
      question: 'What is ss?',
      answers: [
        'This is Option One',
        'This is B Option',
        'This is C option',
        'This is D Option',
      ],
    },
    {
      id: 3,
      question: 'What is REact?',
      answers: [
        'This is Option One',
        'This is B Option',
        'This is C option',
        'This is D Option',
      ],
    },
    {
      id: 4,
      question: 'What is MongoDb?',
      answers: [
        'This is Option One',
        'This is B Option',
        'This is C option',
        'This is D Option',
      ],
    },
  ];

  const [questions, setQuestions] = useState(null);
  const [attempt, setAttempt] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);

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
      const questions = await getQuizAllQuestions(getQuizParams());
      const questionAllOptions = await getQuestionAllOptions();
      const hardCodeOptionsWithQuestion =
        questions && questions.questions && questions.questions.length
          ? questions.questions.map((question) => {
              const options = questionAllOptions.filter((option) => {
                return option.question_id === question.id;
              });
              return {
                ...question,
                answers: options,
              };
            })
          : [];

      setQuestions(hardCodeOptionsWithQuestion);
    };
    getQuestions();
  }, []);

  const handleCurrentQuestion = (e) => {
    setCurrentQuestion(e);
  };
  return (
    <>
      <main>
        <div className='dash-wrapper' style={{paddingTop: '0 !important'}}>
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
                        {i + 1}) {q.question}
                      </div>
                      <SunEditor
                        defaultValue={q.detail}
                        showToolbar={false}
                        setOptions={{
                          height: 300,
                        }}
                        setDefaultStyle='font-size: 18px; color: #8f8f8f; font-weight: 400'
                        disable={true}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: 30,
                        }}>
                        {q.answers.map((a) => (
                          <button
                            className='view-questions-option'
                            style={{
                              textAlign: 'left',
                              backgroundColor:
                                attempt[q.id] == a
                                  ? 'lightgrey'
                                  : 'transparent',
                            }}
                            name={q.question}
                            value={a}
                            onClick={(e) => handleChoose(e.target)}>
                            {a.option_description}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div style={{margin: '20px 0'}}>
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
      </main>{' '}
    </>
  );
};

export default PreviewQuizScreen;
