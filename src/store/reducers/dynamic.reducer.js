import {DYNAMIC} from "../actions/action.types.js";

const initialState = {
    listing: {},
    quizData: []
};

export const dynamic = (state = initialState, action) => {
  console.log("the action", action)
    switch (action.type) {
        case DYNAMIC:
            return {
                ...state,
                listing: {...action.payload},
                quizData: action.payload
            };
        case 'QUIZ': 
        return  {
          ...state,
          quizData: action.payload
        }
        default:
            return state;
    }
};
