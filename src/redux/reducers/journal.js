import {
  Get_User_Journals,
  Get_User_goals,
  delete_journal,
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
    case delete_journal:
      return {
        ...state,
        userJournals: state.userJournals.filter(
          (journal) => journal.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};
export default journalReducer;
