import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}
 
const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const userData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0FcOyInvMgm8-tkqdMkApwdS1K29y_ow';

        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0FcOyInvMgm8-tkqdMkApwdS1K29y_ow';
        }
        axios.post(url, userData)
        .then(response => {
            const expirationTime = new Date(new Date().getTime() +  response.data.expiresIn * 100);
            localStorage.setItem('tokenId', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authLogout(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error.message));
        })
    }
}

export const authAutoAuthenticate = () => {
    return dispatch => {
        const tokenId = localStorage.getItem('tokenId');
        if (!tokenId) {
            dispatch(logout());
        } else {
            const expirationTime = localStorage.getItem('expirationTime');
            if (expirationTime < new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(tokenId, userId));
                dispatch(authLogout(new Date(expirationTime).getTime() - new Date().getTime()));
            }
        }
    }
}

