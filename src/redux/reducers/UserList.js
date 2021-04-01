import {GET_USER_LIST, Show_Message} from '../../shared/constants/ActionTypes';

const initialState = {
  usersList: [],
  message: null,
  success: false,
};

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        usersList: action.payload,
      };
    case Show_Message:
      return {
        ...state,
        message: action.payload.message,
        success: action.payload.success,
      };
    default:
      return state;
  }
};
export default userListReducer;
