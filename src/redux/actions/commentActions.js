import * as actions from './action.types';
import Comment from '../services/comment';
import jsCookie from 'js-cookie';

export const addComment = (params) => {
  return async function (dispatch) {
    try {
      const response = await Comment.addComment(params);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.ADD_COMMENT,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.ADD_COMMENT,
          payload: {error: 'A problem occured while creating the comment'},
        });
      }
    }
  };
};

export const getUserPostComments = (id) => {
  return async function (dispatch) {
    try {
      const response = await Comment.getPostComments(id);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.GET_POST_COMMENTS,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.GET_POST_COMMENTS,
          payload: {error: 'A problem occured while getting the post comments'},
        });
      }
    }
  };
};

export const deleteComment = (id) => {
  return async function (dispatch) {
    try {
      const response = await Comment.deleteComment(id);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.DELETE_COMMENT,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.DELETE_COMMENT,
          payload: {error: 'A problem occured while deleting the comment'},
        });
      }
    }
  };
};
