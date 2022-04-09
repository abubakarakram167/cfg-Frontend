import {SHOW_MESSENGER_APP} from 'shared/constants/ActionTypes';

export const showMessengerApp = (show) => {
  return (dispatch) => {
    dispatch({type: SHOW_MESSENGER_APP, payload: show});
  };
};
