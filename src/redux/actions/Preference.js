import {
  FETCH_ERROR,
  Get_Preferences,
  FETCH_START,
  Show_Message,
  FETCH_SUCCESS,
} from '../../shared/constants/ActionTypes';
// import Api from '../../@crema/services/ApiConfig';
import Api from '../../utils/axios';
import React from 'react';

export const getSpecificPreference = (name) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: FETCH_START});
      Api.get(`/api/preferences/byname/${name}`)
        .then((data) => {
          if (data.status === 200) {
            dispatch({
              type: Show_Message,
              payload: {message: 'Added SuccessFully', success: true},
            });
            res(data);
          } else {
            dispatch({
              type: Show_Message,
              payload: {message: 'SuccessFully Not Added', success: false},
            });
          }
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    });
  };
};

export const getUserPreferencesList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/preferences/list')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: Get_Preferences, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: null,
          });
        }
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const editPreferenceInList = (body, preferences) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    const allPreferencess = [];
    for (let preference of preferences) {
      console.log('all the prefernece', preference);
      allPreferencess.push(
        Api.put(`/api/preferences//edit/${preference.id}`, preference),
      );
    }
    Promise.all(allPreferencess)
      .then((data) => {
        console.log('the all data', data);
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: Show_Message,
          payload: {message: 'Preference Edit SuccessFully', success: true},
        });
      })
      .catch((error) => {
        dispatch({
          type: Show_Message,
          payload: {message: 'Preference Not successFullEdit', success: false},
        });
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
