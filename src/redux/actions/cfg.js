import {
  CREATE_TOOL,
  CREATE_TITLE,
  GET_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
  GET_LIST_DATA,
  GET_Resource_DATA,
  CREATE_Resource,
} from './action.types';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Resource from '../services/cfg';
import jsCookie from 'js-cookie';
import {getSignedUrl} from './media';

export const createResource = (params, cfgType) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      Resource.createResource(params, cfgType)
        .then((response) => {
          if (response.status === 200) {
            jsCookie.set('login', 'yes');
            const data_resp = response.data;
            dispatch({
              type: CREATE_Resource,
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
      Resource.editTitle(params, type)
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

export const createResourceTitle = (params, type) => {
  return async function (dispatch) {
    try {
      const response = await Resource.createTitle(params, type);
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

const getRestoredImage = (featureImageUrl) => {
  return featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1);
};

export const getResourceData = (cfgType) => {
  return async function (dispatch) {
    try {
      const response = await Resource.resourceData(cfgType);
      if (response.status === 200) {
        const data_resp = await response.data;
        const posts = data_resp.data;
        const images = [];

        posts.map((post) => {
          if (
            post &&
            post.featured_image_url !== '' &&
            post.featured_image_url
          ) {
            post.fileName = getRestoredImage(post.featured_image_url);
            images.push(getSignedUrl(post));
          }
        });

        const getImages = await Promise.all(images);

        let transformPosts = posts.map((post) => {
          let specificImage = getImages.filter(
            (image) => post && image.fileName === post.fileName,
          )[0];
          if (post) post.newUrl = specificImage ? specificImage.newUrl : null;
          return post;
        });
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_Resource_DATA,
          payload: {data: transformPosts, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_Resource_DATA,
          payload: {error: 'There was an error creating the Tool'},
        });
      }
    }
  };
};

export const getResourceListData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Resource.getListData(id);

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
          payload: {error: 'There was an error creating the Tool'},
        });
      }
    }
  };
};

export const getContentData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Resource.getContentData(id);
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

export const subscribeEvent = (data) => {
  return Resource.subscribeEvent(data)
    .then((response) => {
      return {status: response.status, data: response.data, message: 'success'};
    })
    .catch((e) => {
      return {status: e.response.status, message: e.response.data};
    });
};
