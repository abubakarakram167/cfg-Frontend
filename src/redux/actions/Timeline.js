import {
  CREATE_TOOL,
  GET_TOOL_DATA,
  CREATE_TITLE,
  GET_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
  GET_LIST_DATA,
} from './action.types';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Timeline from '../services/timeline';
import jsCookie from 'js-cookie';

export const createTimeline = (params) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      Timeline.createTimeline(params)
        .then((response) => {
          if (response.status === 200) {
            jsCookie.set('login', 'yes');
            const data_resp = response.data;
            dispatch({
              type: CREATE_TOOL,
              payload: {...data_resp, error: null},
            });
            dispatch({
              type: Show_Message,
              payload: {message: 'Added SuccessFully', success: true},
            });
            res(response);
          }
        })
        .catch((error) => {
          rej(error);
          console.log('the error', error.response);
          if (error.response && error.response.status === 401) {
            dispatch({
              type: CREATE_TOOL,
              payload: {error: 'There was an error creating the Tool'},
            });
          }
        });
    });
  };
};

export const editContent = (params, type) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      Timeline.editTitle(params, type)
        .then((response) => {
          if (response.status === 200) {
            const data_resp = response.data;
            jsCookie.set('login', 'yes');
            dispatch({
              type: UPDATE_CONTENT_DATA,
              payload: {...data_resp, error: null},
            });
            dispatch({
              type: Show_Message,
              payload: {message: 'Edit SuccessFully', success: true},
            });
            res(true);
          } else {
            dispatch({
              type: Show_Message,
              payload: {message: 'SuccessFully Not Added', success: false},
            });
          }
        })
        .catch((error) => {
          rej(false);
          if (error.response && error.response.status === 401) {
            dispatch(
              {
                type: UPDATE_CONTENT_DATA,
                payload: {error: 'There was an error creating the title'},
              },
              params.type,
            );
          }
        });
    });
  };
};

export const createTimelineTitle = (params, type) => {
  return async function (dispatch) {
    try {
      const response = await Timeline.createTitle(params, type);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: CREATE_TITLE,
          payload: {...data_resp, error: null},
        });
        dispatch({
          type: Show_Message,
          payload: {message: 'Added SuccessFully', success: true},
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

export const getTimelineData = () => {
  return async function (dispatch) {
    try {
      const response = await Timeline.timelineData();
      console.log('the response', response);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_TOOL_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      console.log('the erroeeee ', error);
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_TOOL_DATA,
          payload: {error: 'There was an error creating the Tool'},
        });
      }
    }
  };
};

export const getTimelineListData = (id) => {
  console.log(typeof id);
  return async function (dispatch) {
    try {
      const response = await Timeline.getListData(id);

      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_LIST_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      console.log('on the error', error.response);
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_LIST_DATA,
          payload: {error: 'There was an error creating the Tool'},
        });
      }
    }
  };
};

export const getContentData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Timeline.getContentData(id);
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
