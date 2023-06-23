import $url from "../api/api";
import {redirectToSignInPage, reloadPage, userId, notifyError} from '../utils'


const tryRefreshToken = (error, refetch, mutate, data) => {
    if (error.response?.status === 401) {
        console.clear();
        AuthService.refresh(refetch, mutate, data);
    } else {
        notifyError(error);
    }
};

const tryRefreshTokenWithoutAction = error => {
    if (error.response?.status === 401) {
        console.clear();
        AuthService.refresh();
    } else {
        notifyError(error);
    }
};

const END_POINT = 'account';

const AuthService = {
    async signIn(data) {
        const response = await $url.post(`${END_POINT}/login`, data);
        return response.data.id
    },

    async signUp(data) {
        const response = await $url.post(`${END_POINT}/register`, data);
        return response.data.id
    },

    async recovery(data, isLoginSent) {
        return await $url.post(`${END_POINT}/recovery${isLoginSent ? '/code' : ''}`, data);
    },

    async setNewPassword(data) {
        return await $url.post(`${END_POINT}/recovery/newpass`, data)
    },

    async refresh() {
        try {
            await $url.post(`${END_POINT}/refresh`, {userId});
        } catch (error) {
            this.logout();
        }

    },

    logout() {
        localStorage.removeItem('id');
        reloadPage();
        redirectToSignInPage();
    },
};


export {AuthService, tryRefreshToken, tryRefreshTokenWithoutAction};
