import Api from '../../utils/axios';
import {
  FETCH_ERROR,
  FETCH_START,
  Show_Message,
  Create_journal,
  Get_User_Journals,
} from '../../shared/constants/ActionTypes';

export const getUserJourney = (userId) => {
  return (dispatch) => {
    Api.get(`/api/journals?user_id=${userId}&type=journey&track_my_goal=true`)
      .then((data) => {
        const allJournals = data.data.filter((journal) => {
          if (
            journal.subject &&
            journal.track_my_goal &&
            journal.type === 'journey' &&
            journal.start_date &&
            journal.end_date
          ) {
            return true;
          } else return false;
        });
        console.log('after filter', allJournals);
        if (data.status === 200) {
          dispatch({
            type: Get_User_Journals,
            payload: allJournals,
          });
        }
      })
      .catch((error) => {
        console.log('errorrrr', error);
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

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

export const getSpecificJournal = (subject, userId) => {
  console.log(`subject: ${subject}  and user id: ${userId}`);
  return (dispatch) => {
    return new Promise((res, rej) => {
      dispatch({type: Create_journal});
      Api.get(`/api/journals?subject=${subject}&user_id=${userId}`)
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
