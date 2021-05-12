import {
  CREATE_TOOL,
  GET_TOOL_DATA,
  CREATE_TITLE,
  GET_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
  GET_LIST_DATA,
  GET_ALL_TOOLS_DATA,
  SET_SELECTED_TOOL,
} from './action.types';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Tool from '../services/tool';
import jsCookie from 'js-cookie';

export const createTool = (params) => {
  return async function (dispatch) {
    try {
      console.log('the params', params);
      const response = await Tool.createTool(params);
      console.log('the response after creating', response);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: CREATE_TOOL,
          payload: {...data_resp, error: null},
        });
        dispatch({
          type: Show_Message,
          payload: {message: 'Added SuccessFully', success: true},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: CREATE_TOOL,
          payload: {error: 'There was an error creating the Tool'},
        });
      }
    }
  };
};

export const createToolTitle = (params, type) => {
  return async function (dispatch) {
    try {
      const response = await Tool.createTitle(params, type);
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

export const editContent = (params, type) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      Tool.editTitle(params, type)
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

export const getToolData = () => {
  return async function (dispatch) {
    try {
      const response = await Tool.toolData();
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

export const getToolListData = (id) => {
  console.log(typeof id);
  return async function (dispatch) {
    try {
      const response = await Tool.getListData(id);

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
      const response = await Tool.getContentData(id);
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

export const getToolsData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Tool.getAllTools();
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_ALL_TOOLS_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ALL_TOOLS_DATA,
        payload: {error: 'There was an error fetching the data.'},
      });
    }
  };
};

export const setSelectedToolData = (id) => {
  return {
    type: SET_SELECTED_TOOL,
    payload: id,
  };
};
