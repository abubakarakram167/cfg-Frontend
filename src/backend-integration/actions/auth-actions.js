import {url} from './url';
export const forgotPasswordAction = (email) => {
  return async function (dispatch) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    };

    const response = await fetch(url + '/auth/forgot-password', config);

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: 'FORGOT_PASSWORD',
        payload: data,
        error: null,
      });
    } else {
      dispatch({
        type: 'FORGOT_PASSWORD',
        message: null,
        error: 'An unexpected error occured. Please try again.',
      });
    }
  };
};

export const loginAction = (data) => {
  return async function (dispatch) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/login', config);

    if (response.ok) {
      const data_resp = await response.json();
      dispatch({
        type: 'LOGIN',
        payload: {...data_resp, error: null},
      });
    } else {
      dispatch({
        type: 'LOGIN',
        payload: {error: 'Email or password is incorrect'},
      });
    }
  };
};

export const passwordResetAction = (data) => {
  return async function (dispatch) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/reset-password', config);

    if (response.ok) {
      const data_resp = await response.json();

      dispatch({
        type: 'RESET_PASSWORD',
        payload: {...data_resp, message: 'success'},
        error: null,
      });
    } else {
      dispatch({
        type: 'RESET_PASSWORD',
        payload: {
          error: 'An unexpected error occured. Please try again.',
        },
      });
    }
  };
};

export const registerAction = (data) => {
  return async function (dispatch) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/register', config);

    if (response.ok) {
      const data_resp = await response.json();
      console.log(data_resp);
      return dispatch({
        type: 'REGISTER',
        payload: {...data_resp, message: 'success', error: null},
        error: null,
      });
    } else {
      dispatch({
        type: 'REGISTER',
        payload: {error: 'Email already exists.'},
        error: 'An unexpected error occured. Please try again.',
      });
    }
  };
};
