import * as actions from '../actions/action.types';

const INIT_STATE = {
  comments: [],
  message: null,
  error: null,
};

const commentsReducer = (state = INIT_STATE, action) => {
  let payload = null;
  switch (action.type) {
    case actions.ADD_COMMENT:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      } else console.log(payload);
      return state;
    case actions.GET_POST_COMMENTS:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      } else console.log(payload);
      return state;
    case actions.DELETE_COMMENT:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      } else console.log(payload);
      return state;
    default:
      return state;
  }
};

export default commentsReducer;
