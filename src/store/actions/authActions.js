import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKDj4akX-11OulRVZrO0patBIRts-stuE';

        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKDj4akX-11OulRVZrO0patBIRts-stuE';
        }
        axios.post( url, authData)
        .then( res => {
            console.log(res);
            if (res.data === null) {
                dispatch( authFail('error') )
            } else {
                dispatch(authSuccess(res.data.idToken, res.data.localId));
            }
        }).catch ( error => {
            console.error(error);
            dispatch(authFail(error.response.data.error));
        });
    }
};