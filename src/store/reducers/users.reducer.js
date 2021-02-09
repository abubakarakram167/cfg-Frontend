import {USERS_GET_ALL} from "../actions/action.types.js";

const initialState = {
    users: []
};

export const users = (state = initialState, action) => {
    switch (action.type) {
        case USERS_GET_ALL:
            return {
                ...state,
                users: [...action.payload.users]
            };
        default:
            return state;
    }
};
