import * as actions from '../actions/action.types';

const INIT_STATE = {
  posts: [],
  message: null,
  error: null,
};

const userPostReducer = (state = INIT_STATE, action) => {
  let payload = null;
  switch (action.type) {
    case actions.CREATE_USER_POST:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      } else console.log(payload);
      return state;
    case actions.GET_USER_POSTS:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      } else console.log(payload);
      return state;
    case actions.DELETE_USER_POST:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      } else console.log(payload);
      return state;
    default:
      return state;
  }
};

export default userPostReducer;
