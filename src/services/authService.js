import axios from 'axios'
import {SERVER_URL, redirectToSignInPage, reloadPage, userId, notifyError} from '../util'

const url = axios.create({
    baseURL: `${SERVER_URL}/account/`,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

const tryRefreshToken = (error, refetch, mutate, data) => {
    if (error.response?.status === 401) {
        console.clear();
        AuthService.refresh(refetch, mutate, data);
    } else {
        notifyError(error);
    }
};


const AuthService = {
    async signIn(data) {
        const response = await url.post('login', data);
        return response.data.id
    },

    async signUp(data) {
        const response = await url.post('register', data);
        return response.data.id
    },

    async recovery(data, isEmailSent) {
        return await url.post(`recovery${isEmailSent ? '/code' : ''}`, data)
    },

    async setNewPassword(data) {
        return await url.post('recovery/newpass', data)
    },

    async refresh(refetch, mutate) {
        const response = await url.post('refresh', {userId});
        if (response?.status >= 200 && response?.status <= 399) {
            if (refetch) {
                refetch();
            } else if (mutate) {
                mutate();
            }
        } else if (response?.status === 401) {
            redirectToSignInPage();
        }
    },

    logout() {
        localStorage.removeItem('id');
        reloadPage();
        redirectToSignInPage();
    },
};

export {AuthService, tryRefreshToken};
