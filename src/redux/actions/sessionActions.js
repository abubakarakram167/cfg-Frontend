import {CREATE_SESSION} from './action.types';
import Session from '../services/session';
import jsCookie from 'js-cookie';

export const createSession = (params) => {
  return async function (dispatch) {
    try {
      const response = await Session.createSession(params);
      console.log('the response', response);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: CREATE_SESSION,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: CREATE_SESSION,
          payload: {error: 'There was an error creating the session'},
        });
      }
    }
  };
};
