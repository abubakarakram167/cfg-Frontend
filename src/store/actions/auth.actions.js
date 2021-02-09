import {
    LOGIN,
    ERROR
} from "./action.types";
import Auth from '../services/Auth/auth';
import jsCookie from 'js-cookie';
import {push} from 'connected-react-router';
import {toast} from "react-toastify";


export const register = (params) => {
    return (dispatch) => {
        return Auth.register(params).then(response => {
            // dispatch({type: REGISTER, payload: response.data});
            dispatch(push('/registration-completed'));
        }).catch(e => {
            console.log(e.response.data)
            return dispatch({type: ERROR, payload: {message: e.response.data.message || e.message}});
        })
    };
};



export const login = (params) => {
    return (dispatch) => {
        return Auth.login(params).then(response => {
            jsCookie.set('login', 'yes');
            console.log("data", response.data)
            localStorage.setItem('user', JSON.stringify({
                token: response.data,
                ...response.data.user
            }));
            dispatch({type: LOGIN, payload: response.data});
            dispatch(push('/dashboard'));
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};


export const socialLogin = (params) => {
    return (dispatch) => {
        return Auth.socialLogin(params).then(response => {
            jsCookie.set('login', 'yes');
            console.log("data", response.data)
            localStorage.setItem('user', JSON.stringify({
                token: response.data,
                ...response.data.user
            }));
            dispatch({type: LOGIN, payload: response.data});
            dispatch(push('/dashboard'));
        }).catch(e => {
            console.log(e.response)
            return dispatch({type: ERROR, payload: {message: e.response && e.response.data ? e.response.data.message : e.message}});
        })
    };
};


export const forgot = (params) => {
    return (dispatch) => {
        return Auth.forgot(params).then(response => {
            // dispatch({type: REGISTER, payload: response.data});
            dispatch(push('/reset-request'));
        }).catch(e => {
            console.log(e.response.data)
            return dispatch({type: ERROR, payload: {message: e.response.data.message || e.message}});
        })
    };
};

export const reset = (params) => {
    return (dispatch) => {
        return Auth.reset(params).then(response => {
            // dispatch({type: REGISTER, payload: response.data});
            // dispatch(push('/registration-completed'));
            toast.success('Password changed successfully');
            dispatch(push('/login'));
        }).catch(e => {
            console.log(e.response.data)
            return dispatch({type: ERROR, payload: {message: e.response.data.message || e.message}});
        })
    };
};
