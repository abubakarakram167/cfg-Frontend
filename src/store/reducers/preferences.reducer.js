import {PREFERENCES} from "../actions/action.types.js";

const initialState = {
    all: []
};

export const preferences = (state = initialState, action) => {
    switch (action.type) {
        case PREFERENCES:
            return {
                ...state,
                all: [...action.payload]
            };
        default:
            return state;
    }
};
