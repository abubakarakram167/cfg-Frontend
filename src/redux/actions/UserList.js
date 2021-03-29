import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_USER_LIST,
} from '../../shared/constants/ActionTypes';
// import Api from '../../@crema/services/ApiConfig';
import Api from '../../utils/axios';
import IntlMessages from '../../@crema/utility/IntlMessages';
import React from 'react';

export const onGetUserList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/users/list')
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
        console.log('the data in new', data);
        if (data.status === 200) {
          console.log('the data to be fetched', data);
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
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const editUserInList = (body) => {
  console.log('here the body in edit..', body);
  let updatedStatusBody = {
    ...body,
    status: body.status === 'pending' ? '0' : '1',
  };
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/api/users/', updatedStatusBody)
      .then((data) => {
        if (data.status === 200) {
          console.log('the data to be fetched', data);
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
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const updateUserStatus = (body) => {
  console.log('here the body in edit..', body);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put(`/api/users/status/${body.status}`, body)
      .then((data) => {
        if (data.status === 200) {
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
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
