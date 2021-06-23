import {
  QUIZ,
  ERROR,
  GET_ALL_QUIZ_DATA,
  CREATE_QUIZ,
  GET_ALL_COMPLETE_QUESTIONS,
  GET_ALL_BANK_QUESTIONS,
  Edit_QUIZ,
} from './action.types';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Quiz from '../services/quiz';
import {toast} from 'react-toastify';
import history from '../../utils/history';
import {quizList as getQuizList} from 'redux/actions/quiz';

export const editQuiz = (body) => {
  return (dispatch) => {
    Quiz.editQuiz(body)
      .then((response) => {
        console.log('in after getting response after quiz edit', response);
        if (response.status === 200) {
          const data_resp = response.data;
          dispatch({
            type: Edit_QUIZ,
            payload: {...data_resp, error: null},
          });
          dispatch({
            type: Show_Message,
            payload: {message: 'Quiz Updated SuccessFully', success: true},
          });
        }
        dispatch(getQuizList());
      })
      .catch((error) => {
        console.log('the error', error);
        if (error.response && error.response.status === 401) {
          dispatch({
            type: CREATE_QUIZ,
            payload: {error: 'There was an error creating the Tool'},
          });
        }
      });
  };
};

export const deleteBankQuestion = (questionId) => {
  return Quiz.deleteBankQuestion(questionId)
    .then((response) => {
      console.log('after deleting bank question ', questionId);
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
};

export const deleteQuestionOption = (optionId) => {
  return Quiz.deleteQuestionOption(optionId)
    .then((response) => {
      console.log('after deleting option id', optionId);
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
};

export const getAllBankQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await Quiz.getQuestionBank();
      console.log('the questions getting from Bank.', response);
      if (response.status === 200) {
        dispatch({
          type: GET_ALL_BANK_QUESTIONS,
          payload: {data: response.data, error: null},
        });
      }
    } catch (err) {
      console.log('the error in bank', err);
    }
  };
};

export const getBankQuestionOptions = async (bankId) => {
  try {
    const getAllOptions = await Quiz.getQuestionOptions(bankId);
    console.log('the getAllOptions', getAllOptions);
    return getAllOptions.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getAllCompleteQuestions = () => {
  return (dispatch) => {
    Quiz.getAllCompleteQuestions()
      .then((response) => {
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

export const addQuestionOptions = (body) => {
  return Quiz.addQuestionOption(body)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
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
  return Quiz.addQuestion(body)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
};

export const editQuestion = (body) => {
  const questionId = body.questionId;
  delete body.questionId;
  delete body.answers;
  console.log('the edit Question body', body);

  return Quiz.editQuestion(body, questionId)
    .then((response) => {
      console.log('the response after edit Question', response);
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      return e.response.data;
    });
};

export const editQuestionOptions = (body) => {
  const optionId = body.optionId;
  return Quiz.editQuestionOption(body, optionId)
    .then((response) => {
      console.log('the response after edit Question', response);
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      return e.response.data;
    });
};

export const addAnswer = (body) => {
  console.log('the body in answer', body);
  return Quiz.addAnswers(body)
    .then((response) => {
      console.log('after adding answer', response);
      return response.data;
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

export const getQuestionAllOptions = async (questionId) => {
  try {
    const getAllOptions = await Quiz.getQuestionOptions(questionId);
    console.log('the getAllOptions', getAllOptions);
    return getAllOptions.data;
  } catch (e) {
    return e.response.data;
  }
};

export const addQuiz = (body) => {
  return (dispatch) => {
    Quiz.addQuiz(body)
      .then((response) => {
        console.log('in after getting response', response);
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
