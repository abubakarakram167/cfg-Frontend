import {
    ERROR,
    CATEGORY_GET_ALL
} from "./action.types";
import Categories from '../services/Categories/categories';
import {push} from 'connected-react-router';


export const getAllCategories = () => {
    return (dispatch) => {
        return Categories.getAll().then(response => {
            dispatch({type: CATEGORY_GET_ALL, payload: response.data});
        }).catch(e => {
            console.log(e.response.data)
            return dispatch({type: ERROR, payload: {message: e.response.data.message || e.message}});
        })
    };
};

