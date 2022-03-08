import {
  CREATE_TOOL,
  GET_TOOL_DATA,
  CREATE_TITLE,
  GET_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
  GET_LIST_DATA,
  GET_ALL_TOOLS_DATA,
  SET_SELECTED_TOOLS,
} from './action.types';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Tool from '../services/tool';
import jsCookie from 'js-cookie';
import {getSignedUrl} from './media';

export const createTool = (params) => {
  return async function (dispatch) {
    try {
      const response = await Tool.createTool(params);
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
      console.log('the error', error.response.data);
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
  return async function (dispatch) {
    try {
      const response = await Tool.getListData(id);
      console.log('...................');
      console.log('the responseessss....', response);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_LIST_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      console.log('thew error::', error);
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
      console.log('the response on content', response);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_CONTENT_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      console.log('the error on content', error);
      dispatch({
        type: GET_CONTENT_DATA,
        payload: {error: 'There was an error fetching the data.'},
      });
    }
  };
};

const getRestoredImage = (featureImageUrl) => {
  return featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1);
};

export const getToolsData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Tool.getAllTools();
      if (response.status === 200) {
        const data_resp = await response.data;
        const tools = data_resp;
        const images = [];
        tools.map((tool) => {
          if (
            tool &&
            tool.featured_image_url !== '' &&
            tool.featured_image_url
          ) {
            tool.fileName = getRestoredImage(tool.featured_image_url);
            images.push(getSignedUrl(tool));
          }
        });
        const getImages = await Promise.all(images);

        let transformTools = tools.map((tool) => {
          let specificImage = getImages.filter(
            (image) => tool && image.fileName === tool.fileName,
          )[0];
          if (tool) tool.newUrl = specificImage ? specificImage.newUrl : null;
          return tool;
        });

        // console.log("the transform tools", transformTools)

        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_ALL_TOOLS_DATA,
          payload: {...transformTools, error: null},
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
    type: SET_SELECTED_TOOLS,
    payload: id,
  };
};
