import {SHOW_MESSENGER_APP} from 'shared/constants/ActionTypes';

const INIT_STATE = {
  showMessenger: false,
};
let payload = null;

const AppReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_MESSENGER_APP:
      payload = !action.payload;
      return {
        ...state,
        showMessenger: payload,
        // currentContent: null,
      };

    default:
      return state;
  }
};

export default AppReducer;
