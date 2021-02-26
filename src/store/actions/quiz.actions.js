import { QUIZ, ERROR } from "./action.types";
import Quiz from "../services/Quiz/quiz";

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
  //   console.log("fun");

  return Quiz.addQuizQuestions(body)
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

export const addQuiz = (body) => {
  //   console.log("fun");

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
