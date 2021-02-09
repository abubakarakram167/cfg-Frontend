import {
    PREFERENCES,
    ERROR
} from "./action.types";
import Preferences from '../services/Preferences/preferences';;

export const getPreferences = () => {
    return (dispatch) => {
        return Preferences.getPreferences().then(response => {
            dispatch({type: PREFERENCES, payload: response.data});
        }).catch(e => {
            console.log(e.response.data)
            return dispatch({type: ERROR, payload: {message: e.response.data.message || e.message}});
        })
    };
};
