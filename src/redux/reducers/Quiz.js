import * as actions from 'redux/actions/action.types';

const INIT_STATE = {
  content: [],
  contentData: {},
  error: false,
  current: null,
  titles: [],
  titleCreation: false,
  currentContent: null,
  createdContent: null,
  allCompleteQuestions: [],
  editedContent: false,
  quiz: [],
  allBankQuestions: [],
  selectedQuiz: null,
};
let payload = null;

const QuizReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actions.CREATE_QUIZ:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          // currentContent: null,
        };
      }
      return {
        ...state,
        content: [...state.content, payload],
        // currentContent: null,
      };
    case actions.Edit_QUIZ:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }
      const allQuizes = state.content.map((quiz) => {
        if (quiz.id === payload.id) return payload;
        else return quiz;
      });
      return {
        ...state,
        content: allQuizes,
      };
    case actions.GET_ALL_COMPLETE_QUESTIONS:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }

      return {
        ...state,
        allCompleteQuestions: [...payload.data],
      };
    case actions.GET_ALL_BANK_QUESTIONS:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }

      return {
        ...state,
        allBankQuestions: [...payload.data],
      };
    case actions.GET_QUIZ_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }

      return {
        ...state,
        content: [...payload.data],
        // currentContent: null,
      };
    case actions.GET_ALL_QUIZ_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }

      return {
        ...state,
        content: payload,
      };
    case actions.GET_LIST_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          // currentContent: null,
        };
      }
      return {
        ...state,
        contentData: payload,
        current: payload.data.rows[0],
        titles: payload.data.titles,
        // currentContent: null,
      };
    case actions.CREATE_TITLE:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          titleCreation: false,
          // currentContent: null,
        };
      }
      return {
        ...state,
        error: null,
        titleCreation: true,
        createdContent: payload.content,
        // currentContent: null,
      };
    case actions.UPDATE_CONTENT_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          editedContent: false,
          // currentContent: null,
        };
      }

      return {
        ...state,
        error: null,
        editedContent: true,
        currentContent: payload.content,
      };
    case actions.GET_CONTENT_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          // currentContent: null,
        };
      }
      return {
        ...state,
        currentContent: payload,
      };

    case actions.SET_SELECTED_TOOL:
      const selected = state.quiz.filter((quiz) => {
        if (quiz) {
          return quiz.id === action.payload;
        }
      });
      return {
        ...state,
        selectedQuiz: selected[0],
      };
    default:
      return state;
  }
};

export default QuizReducer;
