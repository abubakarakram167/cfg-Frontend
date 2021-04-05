import {Get_Media} from '../../shared/constants/ActionTypes';
const initialState = {
  mediaList: [],
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Media:
      return {
        ...state,
        mediaList: action.payload,
      };
    default:
      return state;
  }
};
export default mediaReducer;
