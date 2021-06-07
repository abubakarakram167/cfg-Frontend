import {
  QUIZ,
  ERROR,
  GET_ALL_QUIZ_DATA,
  CREATE_QUIZ,
  GET_ALL_COMPLETE_QUESTIONS,
} from './action.types';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Quiz from '../services/quiz';
import {toast} from 'react-toastify';
import history from '../../utils/history';

export const getAllCompleteQuestions = () => {
  return (dispatch) => {
    Quiz.getAllCompleteQuestions()
      .then((response) => {
        console.log('after fetching all questions', response);
        if (response.status === 200) {
          const data_resp = response.data;
          dispatch({
            type: GET_ALL_COMPLETE_QUESTIONS,
            payload: {...data_resp, error: null},
          });
        }
      })
      .catch((error) => {
        console.log('the error', error.response);
      });
  };
};

export const addQuizHead = (data) => {
  return (dispatch) => {
    return Quiz.addHead(data)
      .then((response) => {
        toast.success('Added successfully');
        history.push(`/listing/quiz`);
      })
      .catch((e) => {
        console.log(e.response);
        toast.error('Some Backend Error');
        return dispatch({
          type: ERROR,
          payload: {
            message:
              e.response && e.response.data
                ? e.response.data.message
                : e.message,
          },
        });
      });
  };
};

export const quizList = () => {
  return (dispatch) => {
    return Quiz.getAll()
      .then((response) => {
        console.log('on getting response for quiz', response);
        let listing = response.data;
        let newArray = [];
        if (listing && listing.data) {
          newArray = listing.data.map((e, index) => {
            index % 2 === 0 ? (e.isEven = true) : (e.isEven = false);
            return e;
          });
          listing.data = newArray;
        }
        console.log(listing);
        return dispatch({type: GET_ALL_QUIZ_DATA, payload: listing});
      })
      .catch((e) => {
        console.log(e.response);
        return dispatch({
          type: ERROR,
          payload: {
            message:
              e.response && e.response.data
                ? e.response.data.message
                : e.message,
          },
        });
      });
  };
};

export const addQuestionaire = (body) => {
  //   console.log("fun");

  return Quiz.addQuestion(body)
    .then((response) => {
      console.log(response);
      return response.data;
      // dispatch({ type: QUIZ, payload: response.data });
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
};

export const editQuestion = (body) => {
  return Quiz.editQuestion(body)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
};

export const addAnswer = (body) => {
  //   console.log("fun");

  return Quiz.addAnswers(body)
    .then((response) => {
      console.log(response);
      //   return response.data;
      // dispatch({ type: QUIZ, payload: response.data });
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
};

export const addQuizQuestions = (body) => {
  return Quiz.addQuizQuestions(body)
    .then((response) => {
      console.log(response);
      console.log('after adding questions', response);
      return response.data;
      // dispatch({ type: QUIZ, payload: response.data });
    })
    .catch((e) => {
      console.log('adding questions', e.response.data);
      return e.response.data;
    });
};

export const getQuizAllQuestions = async (quizId) => {
  try {
    const getAllQuestions = await Quiz.getAllQuizQuestions(quizId);
    return getAllQuestions.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getQuestionAllOptions = async () => {
  try {
    const getAllQuestions = await Quiz.getQuestionOptions();
    return getAllQuestions.data;
  } catch (e) {
    return e.response.data;
  }
};

export const addQuiz = (body) => {
  return (dispatch) => {
    Quiz.addQuiz(body)
      .then((response) => {
        if (response.status === 200) {
          const data_resp = response.data;
          dispatch({
            type: CREATE_QUIZ,
            payload: {...data_resp, error: null},
          });
          dispatch({
            type: Show_Message,
            payload: {message: 'Added SuccessFully', success: true},
          });
        }
      })
      .catch((error) => {
        console.log('the error', error.response);
        if (error.response && error.response.status === 401) {
          dispatch({
            type: CREATE_QUIZ,
            payload: {error: 'There was an error creating the Tool'},
          });
        }
      });
  };
};
