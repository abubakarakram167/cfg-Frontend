import * as actions from './action.types';
import Post from '../services/post';
import jsCookie from 'js-cookie';

export const createUserPost = (params) => {
  return async function (dispatch) {
    try {
      const response = await Post.addUserPost(params);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.CREATE_USER_POST,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.CREATE_USER_POST,
          payload: {error: 'A problem occured while creating the post'},
        });
      }
    }
  };
};

export const getUserPost = () => {
  return async function (dispatch) {
    try {
      const response = await Post.getUserPosts();
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.GET_USER_POSTS,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.GET_USER_POSTS,
          payload: {error: 'A problem occured while getting the posts'},
        });
      }
    }
  };
};

export const deleteUserPost = (id) => {
  return async function (dispatch) {
    try {
      const response = await Post.deleteUserPost(id);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.DELETE_USER_POST,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.DELETE_USER_POST,
          payload: {error: 'A problem occured while deleting the posts'},
        });
      }
    }
  };
};
