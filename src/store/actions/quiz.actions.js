import { QUIZ, ERROR } from "./action.types";
import Quiz from "../services/Quiz/quiz";
import {toast} from "react-toastify";
import history from "../../utils/history";

export const addQuizHead = (data) => {
  return (dispatch) => {
      return Quiz.addHead(data).then(response => {
          toast.success('Added successfully');
          history.push(`/listing/quiz`)
      }).catch(e => {
          console.log(e.response)
          toast.error("Some Backend Error")
          return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
      })
  };
};

export const quizList = (urlString) => {
  return (dispatch) => {
      return Quiz.getAll(urlString).then(response => {
          let listing = response.data;
          let newArray = [];
          if (listing && listing.data) {
              newArray = listing.data.map((e, index) => {
                  index % 2 === 0 ? e.isEven = true : e.isEven = false
                  return e;
              });
              listing.data = newArray;
          }
          console.log(listing)
          return dispatch({type: QUIZ, payload: listing});
      }).catch(e => {
          console.log(e.response)
          return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
      })
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
      return response.data;
      // dispatch({ type: QUIZ, payload: response.data });
    })
    .catch((e) => {
      console.log( "adding questions", e.response.data);
      return e.response.data;
    });
};

export const getQuizAllQuestions = async() => {
  try{
    const getAllQuestions = await Quiz.getAllQuizQuestions();
    return getAllQuestions.data
  }catch(e){
    return e.response.data;
  }
}

export const getQuestionAllOptions = async() => {
  try{
    const getAllQuestions = await Quiz.getQuestionOptions();
    return getAllQuestions.data
  }catch(e){
    return e.response.data;
  }
}

export const addQuiz = (body) => {
  return Quiz.addQuiz(body)
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
