import {LOGIN, ERROR} from './action.types';
import Auth from '../services/auth';
import jsCookie from 'js-cookie';

export const loginAction = (params) => {
  return async function (dispatch) {
    try {
      const response = await Auth.login(params);
      console.log('the response', response);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: 'LOGIN',
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: 'LOGIN',
          payload: {error: 'Email or password is incorrect'},
        });
      }
    }
  };
};

export const forgotPasswordAction = (email) => {
  return async function (dispatch) {
    try {
      const response = await Auth.forgot(email);
      if (response.status === 200) {
        const data = await response.json();
        dispatch({
          type: 'FORGOT_PASSWORD',
          payload: data,
          error: null,
        });
      }
    } catch (err) {
      console.log('the error', err.response);
      dispatch({
        type: 'FORGOT_PASSWORD',
        message: null,
        error: 'An unexpected error occured. Please try again.',
      });
    }
  };
};

export const registerAction = (data) => {
  return async function (dispatch) {
    try {
      const response = await Auth.register(data);
      if (response.status === 200) {
        const data_resp = response.data;
        console.log(data_resp);
        return dispatch({
          type: 'REGISTER',
          payload: {...data_resp, message: 'success', error: null},
          error: null,
        });
      }
    } catch (error) {
      console.log('the error', error.message);
      dispatch({
        type: 'REGISTER',
        payload: {error: 'Email already exists.'},
        error: 'An unexpected error occured. Please try again.',
      });
    }
  };
};

export const passwordResetAction = (data) => {
  return async function (dispatch) {
    try {
      const response = await Auth.reset(data);
      if (response.status === 200) {
        const data_resp = response.data;
        console.log(data_resp);
        dispatch({
          type: 'RESET_PASSWORD',
          payload: {...data_resp, message: 'success'},
          error: null,
        });
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: 'RESET_PASSWORD',
        payload: {
          error: 'An unexpected error occured. Please try again.',
        },
      });
    }
  };
};
