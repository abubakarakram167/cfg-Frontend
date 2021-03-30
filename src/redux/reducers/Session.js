import * as actions from 'redux/actions/action.types';

const INIT_STATE = {
  content: [],
  contentData: {},
  error: false,
  current: null,
  titles: [],
  titleCreation: false,
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
        };
      }
      return {
        ...state,
        content: [...state.content, payload.content],
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
        content: [...state.content, ...payload.data],
      };
    case actions.GET_LIST_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }
      return {
        ...state,
        contentData: payload,
        current: payload.data.rows[0],
        titles: payload.data.titles,
      };
    case actions.CREATE_TITLE:
      payload = action.payload;

      if (payload.error) {
        return {
          ...state,
          error: true,
          titleCreation: false,
        };
      }
      return {
        ...state,
        error: null,
        titleCreation: true,
      };
    default:
      return state;
  }
};

export default sessionReducer;
