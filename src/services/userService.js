import $url from "../api/api";
import {userId} from '../utils';


const END_POINT = 'users';

const UserService = {
    async getStatistics(id) {
        const response = await $url.get(`${END_POINT}/preview`, {params: {userId: id}});
        return response.data;
    },

    async getInfo(id) {
        const response = await $url.get(`${END_POINT}/profile`, {params: {userId: id}});

        return response.data;
    },

    async editInfo(data) {
        return await $url.patch(`${END_POINT}/profile`, {userId, ...data})
    },

    async editPassword({oldPassword, newPassword}) {
        return await $url.patch(`${END_POINT}/password`, {userId, oldPassword, newPassword})
    }
}

export {UserService}
