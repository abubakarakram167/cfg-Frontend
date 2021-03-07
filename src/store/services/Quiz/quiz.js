import axiosInstance from "../../../utils/axios";

class Quiz {
  static addQuestion(body) {
    return axiosInstance.post("/api/question", body);
  }
  static addHead(body) {
    return axiosInstance.post("/api/quiz", body);
  }
  static addAnswers(body) {
    return axiosInstance.post("/api/question_options", body);
  }
  static getQuestionOptions(){
    return axiosInstance.get("/api/question_options/list");
  }
  static addQuizQuestions(body) {
    return axiosInstance.post("/api/quiz_questions", body);
  }
  static addQuiz(body) {
    return axiosInstance.post("/api/quiz", body);
  }
  static getAll(url_string){
    return axiosInstance.get("/api/quiz/list");
  }
  static getAllQuizQuestions(quizId){
    return axiosInstance.get(`/api/quiz_questions/${quizId}`);
  }
  static editQuestion(body){
    return axiosInstance.post(`/api/question/editQuestion`, body);
  }

}
export default Quiz;
