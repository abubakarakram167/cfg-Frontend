// import Api from '../../@crema/services/ApiConfig';
import Api from '../../utils/axios';
import baseUrl from '../../utils/url';
import {
  FETCH_ERROR,
  Get_Preferences,
  FETCH_START,
  Show_Message,
  FETCH_SUCCESS,
  Get_Media,
  Create_journal,
} from '../../shared/constants/ActionTypes';

export const createJournal = (journalData) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: Create_journal});
      Api.post('/api/journals', journalData)
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

export const getSpecificJournal = (journalId, userId) => {
  console.log(`journal id: ${journalId}  and user id: ${userId}`);
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: Create_journal});
      Api.get(`/api/journals?id=${journalId}&user_id=${userId}`)
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

export const updateJournal = (payload, journalId) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: Create_journal});
      Api.put(`/api/journals/${journalId}`, payload)
        .then((data) => {
          if (data.status === 200) {
            dispatch({
              type: Show_Message,
              payload: {message: 'Updated SuccessFully', success: true},
            });
            res(data);
          } else {
            dispatch({
              type: Show_Message,
              payload: {message: 'SuccessFully Not Updated', success: false},
            });
          }
        })
        .catch((error) => {
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
          if (data.status === 200) {
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
