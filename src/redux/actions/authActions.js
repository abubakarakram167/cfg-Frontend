import {LOGIN, setPermissions} from './action.types';
import Auth from '../services/auth';
import jsCookie from 'js-cookie';
import * as actions from './action.types';
import {
  Show_Message,
  UPDATE_AUTH_USER,
  UPDATE_NEW_USER,
} from '../../shared/constants/ActionTypes';
export const loginAction = (params) => {
  return async function (dispatch) {
    try {
      const response = await Auth.login(params);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        jsCookie.set('user', data_resp.user);

        dispatch({
          type: LOGIN,
          payload: {...data_resp, error: null},
        });
        dispatch({
          type: setPermissions,
          payload: data_resp.user,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: LOGIN,
          payload: {error: error.response},
        });
      }
    }
  };
};

const getUserObject = (user) => {
  return {
    uid: user.sub,
    displayName: user.first_name,
    email: user.email,
    photoURL: user.picture,
    token: user.sub,
  };
};

export const forgotPasswordAction = (email) => {
  return async function (dispatch) {
    try {
      console.log('the email', email);
      const response = await Auth.forgot(email);
      if (response.status === 200) {
        console.log('the response', response);
        const data = await response.data;
        dispatch({
          type: 'FORGOT_PASSWORD',
          payload: data,
          error: null,
        });
      }
    } catch (err) {
      console.log('the error is', err);
      dispatch({
        type: 'FORGOT_PASSWORD',
        message: null,
        error: 'An unexpected error occured. Please try again.',
      });
    }
  };
};

export const sendMultipleForgotPasswordAction = (usersEmail) => {
  console.log('the usersEmail', usersEmail);

  return async function (dispatch) {
    try {
      const allEmails = [];
      for (let email of usersEmail) {
        allEmails.push(Auth.forgot({email}));
      }
      await Promise.all(allEmails);
      dispatch({
        type: Show_Message,
        payload: {
          message: `Email successFully sends to ${usersEmail.toString()}`,
          success: true,
        },
      });
      // if (response.status === 200) {
      //   console.log("the response", response)
      //   const data = await response.data
      //   dispatch({
      //     type: 'FORGOT_PASSWORD',
      //     payload: data,
      //     error: null,
      //   });
      // }
    } catch (err) {
      console.log('the error is', err.response);
      dispatch({
        type: Show_Message,
        payload: {
          message: `Email not succesfully sends to ${usersEmail.toString()}`,
          success: false,
        },
      });
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
      console.log('here');
      console.log(response);
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
      console.log(error.response.data.message);
      dispatch({
        type: 'RESET_PASSWORD',
        payload: {
          error: error.response.data.message,
        },
      });
    }
  };
};

export const updateUser = (data) => {
  return async function (dispatch) {
    try {
      const response = await Auth.updateUser(data);
      if (response.status === 200) {
        const data_resp = response.data;
        console.log(data_resp);
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.UPDATE_USER,
          payload: {...data_resp, message: 'success', newData: data},
          error: null,
        });
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: actions.UPDATE_USER,
        payload: {
          error: 'An unexpected error occured. Please try again.',
        },
      });
    }
  };
};

export const setCurrentUser = (data) => {
  try {
    return {
      type: actions.SET_CURRENT_USER,
      payload: data,
    };
  } catch {
    return {
      type: actions.SET_CURRENT_USER,
      payload: {
        error: 'There was an error setting the user',
      },
    };
  }
};

export const setErrorToNull = () => {
  return {
    type: actions.SET_AUTH_ERROR_TO_NULL,
  };
};
