import {
  FETCH_ERROR,
  Get_Preferences,
  FETCH_START,
  Show_Message,
  FETCH_SUCCESS,
  Get_Media,
} from '../../shared/constants/ActionTypes';
// import Api from '../../@crema/services/ApiConfig';
import Api from '../../utils/axios';
import React from 'react';
const baseUrl = 'http://localhost:3690/';

export const createOneMedia = (formData) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: FETCH_START});
      Api.post('/api/media/', formData)
        .then((data) => {
          console.log('afterr....');
          console.log('after created...', data);
          if (data.status === 200) {
            console.log('the data to be fetched', data);
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
          console.log('error', error.response);
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    });
  };
};

export const getUserMediaList = (formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/media/list')
      .then(async (data) => {
        console.log('On getting data', data);
        const allMedia = data.data;
        const allFiles = [];
        for (let media of allMedia) {
          allFiles.push(Api.get(`/api/media/${media.id}`));
        }
        const getAllFiles = await Promise.all(allFiles);
        console.log('the get All Files', getAllFiles);
        if (data.status === 200) {
          console.log('the data to be fetched', getAllFiles);
          dispatch({
            type: Get_Media,
            payload: getAllFiles.map((file) => {
              return {
                url: baseUrl + file.data.media.file_name,
                fileName: file.data.media.title,
                description: file.data.media.description,
                uploadedOn: file.data.media.created_at,
                id: file.data.media.id,
              };
            }),
          });
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
