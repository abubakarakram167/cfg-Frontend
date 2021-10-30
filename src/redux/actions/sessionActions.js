import {
  CREATE_SESSION,
  GET_SESSION_DATA,
  GET_LIST_DATA,
  CREATE_TITLE,
  GET_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
} from './action.types';
import {Show_Message} from '../../shared/constants/ActionTypes';
import Session from '../services/session';
import jsCookie from 'js-cookie';
import Api from '../../utils/axios';

export const createSession = (params) => {
  return async function (dispatch) {
    try {
      const response = await Session.createSession(params);
      if (response.status === 200) {
        const data_resp = await response.data;
        console.log('after session', data_resp);
        data_resp.content.author = {
          first_name: JSON.parse(jsCookie.get('user')).first_name,
          user_name: JSON.parse(jsCookie.get('user')).user_name,
        };
        jsCookie.set('login', 'yes');
        dispatch({
          type: CREATE_SESSION,
          payload: {...data_resp, error: null},
        });
        dispatch({
          type: Show_Message,
          payload: {message: 'Session Added SuccessFully', success: true},
        });
      }
    } catch (error) {
      console.log('the error', error);
      if (error.response && error.response.status === 401) {
        dispatch({
          type: CREATE_SESSION,
          payload: {error: 'There was an error creating the session'},
        });
      }
    }
  };
};

export const sendInvite = (body) => {
  return new Promise((res, rej) => {
    Api.post(`api/invites`, body)
      .then((response) => {
        if (response.status === 200) {
          const data_resp = response.data;
          jsCookie.set('login', 'yes');
          res(data_resp);
        }
      })
      .catch((error) => {
        rej(false);
        console.log('the error', error.response);
      });
  });
};

export const createSessionTitle = (params, type) => {
  return async function (dispatch) {
    return new Promise((res, rej) => {
      Session.createTitle(params, type)
        .then((response) => {
          console.log('the response', response);
          if (response.status === 200) {
            const data_resp = response.data;
            jsCookie.set('login', 'yes');
            dispatch({
              type: CREATE_TITLE,
              payload: {...data_resp, error: null},
            });
            dispatch({
              type: Show_Message,
              payload: {message: 'Added SuccessFully', success: true},
            });
            res(data_resp);
          }
        })
        .catch((error) => {
          rej(false);
          console.log('the error', error.response);
          if (error.response && error.response.status === 401) {
            dispatch(
              {
                type: CREATE_TITLE,
                payload: {error: 'There was an error creating the title'},
              },
              params.type,
            );
          }
        });
    });
  };
};

// export const createSessionTitle = (params, type) => {
//   return async function (dispatch) {
//     try {
//       const response = await Session.createTitle(params, type);
//       if (response.status === 200) {
//         const data_resp = await response.data;
//         jsCookie.set('login', 'yes');
//         dispatch({
//           type: CREATE_TITLE,
//           payload: {...data_resp, error: null},
//         });
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         dispatch(
//           {
//             type: CREATE_TITLE,
//             payload: {error: 'There was an error creating the title'},
//           },
//           params.type,
//         );
//       }
//     }
//   };
// };

export const editContent = (params, type) => {
  if (params.type !== 'mini') delete params.facilitator;

  return (dispatch) => {
    return new Promise((res, rej) => {
      Session.editTitle(params, type)
        .then((response) => {
          if (response.status === 200) {
            const data_resp = response.data;
            jsCookie.set('login', 'yes');
            dispatch({
              type: UPDATE_CONTENT_DATA,
              payload: {...data_resp, error: null},
            });
            dispatch({
              type: Show_Message,
              payload: {message: 'Edit SuccessFully', success: true},
            });
            res(true);
          } else {
            dispatch({
              type: Show_Message,
              payload: {message: 'SuccessFully Not Added', success: false},
            });
          }
        })
        .catch((error) => {
          console.log('the payload is too', error.response);
          rej(false);
          if (error.response && error.response.status === 401) {
            dispatch(
              {
                type: UPDATE_CONTENT_DATA,
                payload: {error: 'There was an error creating the title'},
              },
              params.type,
            );
          }
        });
    });
  };
};

// export const editContent = (params, type) => {
//   return async function (dispatch) {
//     try {
//       const response = await Session.editTitle(params, type);
//       if (response.status === 200) {
//         const data_resp = await response.data;
//         jsCookie.set('login', 'yes');
//         dispatch({
//           type: UPDATE_CONTENT_DATA,
//           payload: {...data_resp, error: null},
//         });
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         dispatch(
//           {
//             type: UPDATE_CONTENT_DATA,
//             payload: {error: 'There was an error creating the title'},
//           },
//           params.type,
//         );
//       }
//     }
//   };
// };

export const getSessionData = () => {
  return async function (dispatch) {
    try {
      const response = await Session.sessionData();
      if (response.status === 200) {
        const data_resp = await response.data;
        console.log('here data_resp', data_resp);
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_SESSION_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      console.log('the erroeeee ', error);
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_SESSION_DATA,
          payload: {error: 'There was an error creating the session'},
        });
      }
    }
  };
};

export const getSessionListData = (id, type) => {
  return async function (dispatch) {
    try {
      const response = await Session.getListData(id, type);

      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_LIST_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      console.log('the error', error);
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_LIST_DATA,
          payload: {error: 'There was an error creating the session'},
        });
      }
    }
  };
};

export const getContentData = (id) => {
  return async function (dispatch) {
    try {
      const response = await Session.getContentData(id);
      if (response.status === 200) {
        const data_resp = await response.data;
        console.log('the content data', data_resp);
        jsCookie.set('login', 'yes');
        dispatch({
          type: GET_CONTENT_DATA,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      dispatch({
        type: GET_CONTENT_DATA,
        payload: {error: 'There was an error fetching the data.'},
      });
    }
  };
};
