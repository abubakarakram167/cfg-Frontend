import axios from 'axios';
import axiosInstance from '../../utils/axios';

class Quiz {
  static addQuestion(body) {
    return axiosInstance.post('/api/question', body);
  }

  static getBankQuestionOptions(bankId) {
    return axiosInstance.get(`/api/bank_options/list/${bankId}`);
  }

  static deleteQuestionOption(optionId) {
    return axiosInstance.delete(`/api/question_options/${optionId}`);
  }

  static deleteBankQuestion(questionId) {
    return axiosInstance.delete(`/api/questions_bank/${questionId}`);
  }

  static addHead(body) {
    return axiosInstance.post('/api/quiz', body);
  }
  static addQuestionOptions(body) {
    return axiosInstance.post('/api/question_options', body);
  }
  static addAnswers(body) {
    return axiosInstance.post('/api/question_options', body);
  }
  static getQuestionBank() {
    return axiosInstance.get(`/api/questions_bank/list`);
  }
  static getQuestionOptions(questionId) {
    return axiosInstance.get(`/api/question_options/list/${questionId}`);
  }
  static addQuizQuestions(body) {
    return axiosInstance.post('/api/quiz_questions', body);
  }
  static addQuiz(body) {
    return axiosInstance.post('/api/quiz', body);
  }
  static editQuiz(body) {
    return axiosInstance.put(`/api/quiz/${body.id}`, body);
  }
  static getAll() {
    return axiosInstance.get('/api/quiz/list');
  }
  static getAllCompleteQuestions() {
    return axiosInstance.get('/api/question/list');
  }
  static getAllQuizQuestions(quizId) {
    return axiosInstance.get(`/api/quiz_questions/${quizId}`);
  }
  static editQuestion(body, questionId) {
    return axiosInstance.put(`/api/question/${parseInt(questionId)}`, body);
  }
  static editQuestionOption(body, questionId) {
    return axiosInstance.put(
      `/api/question_options/${parseInt(questionId)}`,
      body,
    );
  }
}

export default Quiz;
