import {DYNAMIC} from "../actions/action.types.js";

const initialState = {
    listing: {}
};

export const dynamic = (state = initialState, action) => {
    switch (action.type) {
        case DYNAMIC:
            return {
                ...state,
                listing: {...action.payload}
            };
        default:
            return state;
    }
};
