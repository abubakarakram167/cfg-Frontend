import {LOGIN} from "../actions/action.types.js";

const initialState = {
    user: {}
};

export const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {
                    token: action.payload.token,
                    ...action.payload.user
                }
            };
        default:
            return state;
    }
};
