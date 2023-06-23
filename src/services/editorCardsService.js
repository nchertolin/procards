import $url from "../api/api";
import {userId} from '../utils';


const END_POINT = 'editing/cards';

const EditorCardsService = {
    async getCards(id, searchQuery) {
        const response = await $url.get(END_POINT, {
            params: {userId, deckId: id, searchQuery}
        })
        return response.data
    },

    async editCard(data) {
        return await $url.patch(END_POINT, {userId, ...data})
    },

    async createCard(data) {
        const response = await $url.post(END_POINT, {userId, ...data})
        return response.data.cardId;
    },

    async deleteCard(cardId) {
        return await $url.delete(END_POINT, {data: {userId, cardId}})
    },
};

export {EditorCardsService}
