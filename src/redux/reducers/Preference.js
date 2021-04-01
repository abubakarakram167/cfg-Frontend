import {Get_Preferences} from '../../shared/constants/ActionTypes';
const initialState = {
  preferenceList: [],
};

const preferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Preferences:
      return {
        ...state,
        preferenceList: action.payload,
      };
    default:
      return state;
  }
};
export default preferenceReducer;
