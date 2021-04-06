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
import baseUrl from '../../utils/url';

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

export const deleteMediaData = (formData) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: FETCH_START});
      Api.delete(`/api/media/${formData.id}`)
        .then((data) => {
          console.log('the data after del', data);
          if (data.status === 200) {
            console.log('the data to be fetched', data);
            dispatch({
              type: Show_Message,
              payload: {message: 'Delete SuccessFully', success: true},
            });
            res(true);
          } else {
            dispatch({
              type: Show_Message,
              payload: {message: 'SuccessFully Not Deleted', success: false},
            });
          }
        })
        .catch((error) => {
          rej(false);
          console.log('error', error.response);
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    });
  };
};

export const editMediaData = (formData) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: FETCH_START});
      const body = {
        title: formData.fileName,
        description: formData.description,
      };
      Api.put(`/api/media/${formData.id}`, body)
        .then((data) => {
          if (data.status === 200) {
            console.log('the data to be fetched', data);
            dispatch({
              type: Show_Message,
              payload: {message: 'Edit SuccessFully', success: true},
            });
            res(true);
          } else {
            dispatch({
              type: Show_Message,
              payload: {message: 'SuccessFully Not Edit', success: false},
            });
          }
        })
        .catch((error) => {
          rej(false);
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
        // const allFiles = [];
        // for (let media of allMedia) {
        //   allFiles.push(Api.get(`/api/media/${media.id}`));
        // }
        // const getAllFiles = await Promise.all(allFiles);
        console.log('the get All Files', allMedia);
        if (data.status === 200) {
          dispatch({
            type: Get_Media,
            payload: allMedia.map((file) => {
              return {
                url: baseUrl + 'static/' + file.file_name,
                fileName: file.title,
                description: file.description,
                uploadedOn: file.created_at,
                thumbnailPreview:
                  baseUrl + 'static/thumbnails/' + file.file_name,
                id: file.id,
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
