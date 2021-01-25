import {toast} from "react-toastify";

import {ERROR} from "../actions/action.types.js";

const initialState = {};

export const error = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            toast.error(action.payload.message || 'Something went wrong!',{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            return {...state};
        default:
            return state;
    }
}
