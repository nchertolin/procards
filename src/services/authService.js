import $url from "../api/api";
import {redirectToSignInPage, reloadPage} from '../js/utils';
import {userId} from '../js/consts';


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
        console.clear();
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


export {AuthService};
