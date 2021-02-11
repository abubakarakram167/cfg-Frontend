import {
    PREFERENCES,
    ERROR
} from "./action.types";
import Preferences from '../services/Preferences/preferences';

export const getPreferences = () => {
    return (dispatch) => {
        return Preferences.getPreferences().then(response => {
            let listing = response.data;
            let newArray = [];
            if (listing && listing.length) {
                newArray = listing.map((e, index) => {
                    index % 2 === 0 ? e.isEven = true : e.isEven = false
                    return e;
                });
            }
            dispatch({type: PREFERENCES, payload: newArray});
        }).catch(e => {
            console.log(e.response.data)
            return dispatch({type: ERROR, payload: {message: e.response.data.message || e.message}});
        })
    };
};
