import $url from "../api/api";
import {userId} from '../utils';


const END_POINT = 'cards';

const LearningCardsService = {
    async getCards(id) {
        const response = await $url.get(END_POINT, {params: {userId, deckId: id}})
        return response.data;
    },

    async postGrade(data) {
        return await $url.post(`${END_POINT}/grade`, {userId, ...data})
    },
}

export {LearningCardsService}
