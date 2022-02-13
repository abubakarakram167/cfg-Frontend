import Api from '../../utils/axios';
import {
  FETCH_ERROR,
  FETCH_START,
  Show_Message,
  Create_journal,
  Get_User_Journals,
  Get_User_goals,
  delete_journal,
} from '../../shared/constants/ActionTypes';

export const getUserGoals = (userId) => {
  return (dispatch) => {
    Api.get(`/api/journals?user_id=${userId}&type=goal&track_my_goal=true`)
      .then((data) => {
        const allGoals = data.data.filter((journal) => {
          if (
            journal.subject &&
            journal.type === 'goal' &&
            journal.start_date &&
            journal.end_date &&
            journal.status
          ) {
            return true;
          } else return false;
        });

        if (data.status === 200) {
          dispatch({
            type: Get_User_goals,
            payload: allGoals,
          });
        }
      })
      .catch((error) => {
        console.log('errorrrr', error);
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getUserJourney = (userId) => {
  return (dispatch) => {
    Api.get(`/api/journals?_count=1000&_pageNo=1&user_id=${userId}`)
      .then((data) => {
        const allJournals = data.data.filter((journal) => {
          if (
            journal.subject &&
            journal.start_date &&
            journal.end_date &&
            journal.status
          ) {
            return true;
          } else return false;
        });
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

export const deleteJournal = (journalId) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      Api.delete(`/api/journals/${journalId}`)
        .then((data) => {
          console.log('after delete', data);
          if (data.status === 200) {
            dispatch({
              type: Show_Message,
              payload: {message: 'Delete SuccessFully', success: true},
            });
            dispatch({
              type: delete_journal,
              payload: journalId,
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
          console.log('error', error);
          rej(false);
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    });
  };
};
