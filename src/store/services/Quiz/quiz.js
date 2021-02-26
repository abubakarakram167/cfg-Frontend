import axiosInstance from "../../../utils/axios";

class Quiz {
  static addQuestion(body) {
    return axiosInstance.post("/api/question", body);
  }
  static addAnswers(body) {
    return axiosInstance.post("/api/question_options", body);
  }
  static addQuizQuestions(body) {
    return axiosInstance.post("/api/quiz_questions", body);
  }
  static addQuiz(body) {
    return axiosInstance.post("/api/quiz", body);
  }
}
export default Quiz;
