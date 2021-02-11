import {
    ERROR,
    DYNAMIC
} from "./action.types";
import Dynamic from '../services/Dynamic/dynamic';
import {toast} from "react-toastify";
import history from "../../utils/history";


export const contentList = (type, urlString) => {
    return (dispatch) => {
        return Dynamic.getAll(type, urlString).then(response => {
            let listing = response.data;
            let newArray = [];
            if (listing && listing.data) {
                newArray = listing.data.map((e, index) => {
                    index % 2 === 0 ? e.isEven = true : e.isEven = false
                    return e;
                });
                listing.data = newArray;
            }
            return dispatch({type: DYNAMIC, payload: listing});
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};


export const addHead = (type, data) => {
    return (dispatch) => {
        return Dynamic.addHead(type, data).then(response => {
            toast.success('Added successfully');
            history.push(`/listing/${type}`)
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};


export const editHead = (type, data) => {
    return (dispatch) => {
        return Dynamic.editHead(type, data).then(response => {
            toast.success('Updated successfully');
            history.push(`/listing/${type}`)
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};
