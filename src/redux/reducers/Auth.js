import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  UPDATE_NEW_USER,
} from '../../shared/constants/ActionTypes';
import * as actions from '../actions/action.types';

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
    case UPDATE_NEW_USER:
      return {
        ...state,
        newUser: action.payload,
      };

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
      payload = action.payload;
      return {...state, payload};
    case actions.SET_AUTH_ERROR_TO_NULL:
      return {
        ...state,
        error: null,
      };
    case 'LOGIN':
      console.log('here', action.payload);
      payload = action.payload;
      let error = null;
      if (payload.token) {
        localStorage.setItem('auth-token', payload.token);
      }
      if (payload.user) {
        localStorage.setItem('current-user', JSON.stringify(payload.user));
      }
      if (payload.error) error = payload.error.data.message;
      return {...state, user: payload.user, token: payload.token, error: error};
    case 'RESET_PASSWORD':
      payload = action.payload;
      if (payload.error) {
        return {...state, ...payload};
      } else {
        return {...state, ...payload, error: payload.error};
      }

    case 'REGISTER':
      payload = action.payload;
      console.log(payload);
      return {...state, ...payload};
    case actions.SET_CURRENT_USER:
      payload = action.payload;
      if (payload.action) {
        return {...state, error: payload.error};
      }
      return {...state, user: payload};

    case actions.UPDATE_USER:
      payload = action.payload;
      console.log(payload);
      if (payload.error) {
        return {
          ...state,
          error: 'There was an error updating the user',
        };
      }
      const user = {...state.user, ...payload.newData};
      localStorage.setItem('current-user', JSON.stringify(user));
      return {...state, user};
    default:
      return state;
  }
};
export default authReducer;
