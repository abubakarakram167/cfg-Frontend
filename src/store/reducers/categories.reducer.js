import {CATEGORY_GET_ALL} from "../actions/action.types.js";

const initialState = {
    categories: []
};

export const categories = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_GET_ALL:
            return {
                ...state,
                categories: [...action.payload]
            };
        default:
            return state;
    }
};
