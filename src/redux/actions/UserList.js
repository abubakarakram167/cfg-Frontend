import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_USER_LIST,
  Show_Message,
} from '../../shared/constants/ActionTypes';
// import Api from '../../@crema/services/ApiConfig';
import Api from '../../utils/axios';
import IntlMessages from '../../@crema/utility/IntlMessages';
import React from 'react';

export const onGetUserList = (pagination) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get(`/api/users/list?_count=100&_page=${pagination.page}`)
      .then((data) => {
        console.log('the data in new', data);
        if (data.status === 200) {
          console.log('the data to be fetched', data);
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_USER_LIST, payload: data.data.userResponse});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const addUserToList = (body) => {
  console.log('here the body comes...', body);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('/api/users/', body)
      .then((data) => {
        console.log('after adding data', data);
        if (data.status === 200) {
          dispatch({
            type: Show_Message,
            payload: {message: 'Record Add SuccessFully', success: true},
          });
          dispatch({type: FETCH_SUCCESS});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        console.log('error', error.response);
        if (error.response.data) {
          dispatch({
            type: Show_Message,
            payload: {message: error.response.data.message, success: false},
          });
        }
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const editUserInList = (body) => {
  console.log(body);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/api/users/', body)
      .then((data) => {
        console.log('edited', data);
        if (data.status === 200) {
          console.log('hello');
          const newUserObj = JSON.parse(localStorage.getItem('current-user'));
          if (newUserObj.id === body.id) {
            newUserObj.cfg_session_id = body.cfg_session_id;
            localStorage.setItem('current-user', JSON.stringify(newUserObj));
          }
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: Show_Message,
            payload: {message: 'Record Edit SuccessFully', success: true},
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        console.log('the error', error.response);
        dispatch({
          type: Show_Message,
          payload: {message: 'Record Not successFully Edit', success: false},
        });
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const updateUserStatus = (body) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put(`/api/users/status/${body.status}`, body)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch(onGetUserList());
          dispatch({
            type: Show_Message,
            payload: {
              message: `Record ${body.status} SuccessFully`,
              success: true,
            },
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
