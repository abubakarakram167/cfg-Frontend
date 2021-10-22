import {Get_User_Journals} from '../../shared/constants/ActionTypes';

const initialState = {
  userJournals: [],
};

const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_User_Journals:
      return {
        ...state,
        userJournals: action.payload,
      };
    default:
      return state;
  }
};
export default journalReducer;
