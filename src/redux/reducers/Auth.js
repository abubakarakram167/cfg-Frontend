import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  UPDATE_NEW_USER,
} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
  user: null,
  token: null,
  message: null,
  error: null,
  newUser: {},
};
let payload = null;
const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case UPDATE_NEW_USER: {
      return {
        ...state,
        newUser: action.payload,
      };
    }
    case SIGNOUT_AUTH_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case 'FORGOT_PASSWORD':
      payload = action;
      return {...state, payload};
    case 'LOGIN':
      payload = action.payload;
      if (payload.token) {
        localStorage.setItem('auth-token', payload.token);
      }
      return {...state, ...payload};
    case 'RESET_PASSWORD':
      payload = action.payload;
      return {...state, ...payload};
    case 'REGISTER':
      payload = action.payload;
      console.log(payload);
      return {...state, ...payload};
    default:
      return state;
  }
};
export default authReducer;
