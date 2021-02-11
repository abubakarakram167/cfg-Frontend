import {
    ERROR,
    USERS_GET_ALL
} from "./action.types";
import Users from '../services/Users/users';
import {capitalCase} from "change-case";
import {toast} from "react-toastify";
import {push} from 'connected-react-router';

export const getAllUsers = (urlString) => {
    return (dispatch) => {
        return Users.getAll(urlString).then(response => {
            console.log("response", response.data)
            let data = {
                users: []
            }
            let status = {
                0: "Pending",
                1: "Approved",
                2: "Disabled",
            }
            if (response.data && response.data.users) {
                data.users = response.data.users.map((e, index) => {
                    index % 2 === 0 ? e.isEven = true : e.isEven = false
                    e.status = status[e.status];
                    e.role = capitalCase(e.role);
                    return e;
                })
            }
            dispatch({type: USERS_GET_ALL, payload: response.data});
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};

export const changeUsersStatus = (type, users) => {
    return (dispatch) => {
        return Users.changeUsersType(type, users).then(response => {
            toast.success('Users updated successfully');
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};


export const addUser = (user) => {
    return (dispatch) => {
        return Users.addUser(user).then(response => {
            toast.success('Users added successfully');
            dispatch(push('/userManagement'));
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};

export const editUser = (user) => {
    return (dispatch) => {
        return Users.editUser(user).then(response => {
            toast.success('Users updated successfully');
            dispatch(push('/userManagement'));
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};

