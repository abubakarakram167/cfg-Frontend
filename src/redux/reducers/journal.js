import {
  Get_User_Journals,
  Get_User_goals,
} from '../../shared/constants/ActionTypes';

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
    case Get_User_goals:
      return {
        ...state,
        userGoals: action.payload,
      };
    default:
      return state;
  }
};
export default journalReducer;
