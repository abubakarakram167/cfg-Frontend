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
  editedContent: false,
};
let payload = null;
const sessionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actions.CREATE_SESSION:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          currentContent: null,
        };
      }
      return {
        ...state,
        content: [...state.content, payload.content],
        currentContent: null,
      };
    case actions.GET_SESSION_DATA:
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
        currentContent: null,
      };
    case actions.GET_LIST_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          currentContent: null,
        };
      }
      return {
        ...state,
        contentData: payload,
        current: payload.data.rows[0],
        titles: payload.data.titles,
        currentContent: null,
      };
    case actions.CREATE_TITLE:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          titleCreation: false,
          currentContent: null,
        };
      }
      return {
        ...state,
        error: null,
        titleCreation: true,
        createdContent: payload.content,
        currentContent: null,
      };
    case actions.UPDATE_CONTENT_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          editedContent: false,
          currentContent: null,
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
          currentContent: null,
        };
      }
      return {
        ...state,
        currentContent: payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
