import {
  CREATE_SESSION,
  GET_SESSION_DATA,
  GET_LIST_DATA,
  CREATE_TITLE,
  GET_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
} from './action.types';
import Session from '../services/session';
import jsCookie from 'js-cookie';

export const createSession = (params) => {
  return async function (dispatch) {
    try {
      const response = await Session.createSession(params);
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

export const createSessionTitle = (params, type) => {
  return async function (dispatch) {
    try {
      const response = await Session.createTitle(params, type);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: CREATE_TITLE,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(
          {
            type: CREATE_TITLE,
            payload: {error: 'There was an error creating the title'},
          },
          params.type,
        );
      }
    }
  };
};

export const editContent = (params, type) => {
  return async function (dispatch) {
    try {
      const response = await Session.editTitle(params, type);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: UPDATE_CONTENT_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(
          {
            type: UPDATE_CONTENT_DATA,
            payload: {error: 'There was an error creating the title'},
          },
          params.type,
        );
      }
    }
  };
};

export const getSessionData = () => {
  return async function (dispatch) {
    try {
      const response = await Session.sessionData();
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_SESSION_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_SESSION_DATA,
          payload: {error: 'There was an error creating the session'},
        });
      }
    }
  };
};

export const getSessionListData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Session.getListData(id);

      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_LIST_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_LIST_DATA,
          payload: {error: 'There was an error creating the session'},
        });
      }
    }
  };
};

export const getContentData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Session.getContentData(id);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_CONTENT_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      dispatch({
        type: GET_CONTENT_DATA,
        payload: {error: 'There was an error fetching the data.'},
      });
    }
  };
};
