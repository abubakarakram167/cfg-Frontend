import * as actions from 'redux/actions/action.types';

const INIT_STATE = {};
let payload = null;
const sessionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actions.CREATE_SESSION:
      payload = action.payload;
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
