import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MemoryIcon from '@material-ui/icons/Memory';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  cont: {
    display: 'flex',
    flexDirection: 'column',
    height: '520px',
    overflowY: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  bottomButtons: {
    textAlign: 'center',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-around',
  },
  bottomButtonsChild: {
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    fontSize: 12,
  },
  modalText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
}));

const QuizAssessmentModal = ({
  onSave,
  onClose,
  isPassed,
  correctAnswers,
  selectedOptions,
  quiz,
}) => {
  const classes = useStyles();
  const [question, setQuestion] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');
  const [isAddToBank, setIsAddToBank] = useState(false);

  let quizPassedOrFailUrl = '/admin';
  if (quiz) {
    quizPassedOrFailUrl = isPassed
      ? quiz.success_navigate_page
      : quiz.fail_navigate_page;
    quizPassedOrFailUrl = new URL(quizPassedOrFailUrl).pathname;
  }

  const handleSave = async () => {
    if (question !== '') {
      await onSave({
        question,
        questionDetail,
        isAddToBank,
      });
    }
    onClose();
  };

  return (
    <div className={classes.cont}>
      <div>
        <p style={{fontSize: 16, paddingTop: 12}} className={classes.modalText}>
          {' '}
          {correctAnswers}/{selectedOptions} Answers Correct
        </p>
        <p style={{fontSize: 20, paddingTop: 12}} className={classes.modalText}>
          <span>
            {isPassed ? (
              <CheckCircleIcon
                style={{
                  position: 'relative',
                  right: 5,
                  fill: '#57c557',
                  fontSize: 35,
                }}
              />
            ) : (
              <CancelIcon style={{fill: '#d04f12', right: 5, fontSize: 40}} />
            )}
          </span>
          <span style={{fontSize: 30, position: 'relative', top: 5}}>
            {isPassed ? 'Assessment Goal Achieved' : 'Reassessment Required'}
          </span>
        </p>
        {isPassed && (
          <div>
            <p
              style={{fontSize: 16, paddingTop: 12}}
              className={classes.modalText}>
              You Acquired a silver badge.{' '}
              <span>
                <MemoryIcon
                  style={{
                    position: 'relative',
                    right: 5,
                    fill: 'gray',
                    fontSize: 35,
                  }}
                />
              </span>
            </p>
            <p
              style={{fontSize: 18, paddingTop: 12}}
              className={classes.modalText}>
              {' '}
              You recieved{' '}
              <span style={{fontSize: 22, color: 'red'}}>1000P</span>
            </p>
          </div>
        )}
      </div>
      <div
        className={classes.bottomButtons}
        style={
          isPassed
            ? {textAlign: 'center'}
            : {textAlign: 'center', marginTop: 80}
        }>
        <button
          className={classes.bottomButtonsChild}
          style={{backgroundColor: 'gray', borderColor: 'gray'}}
          onClick={() => onClose()}>
          <VisibilityIcon style={{fill: 'white', fontSize: 25}} />
          Review Answers
        </button>
        <Link to={quizPassedOrFailUrl}>
          <button
            className={classes.bottomButtonsChild}
            style={{backgroundColor: 'red', borderColor: 'red'}}>
            <HomeIcon style={{fill: 'white', fontSize: 25}} />
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizAssessmentModal;
