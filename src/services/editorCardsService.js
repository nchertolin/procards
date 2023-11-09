import $url from "../api/api";
import {userId} from '../js/consts';

const END_POINT = 'editing/cards';

const EditorCardsService = {
    async getCards(id, searchQuery) {
        const response = await $url.get(`${END_POINT}/fromdeck`, {
            params: {userId, deckId: id, searchQuery}
        })
        return response.data
    },

    async editCard(data) {
        return await $url.patch(END_POINT, {userId, ...data})
    },

    async createCard(data) {
        const response = await $url.post(END_POINT, {userId, ...data});
        const cardId = response.data.cardId;
        await this.addCardToDeck({cardId, ...data});
        return response.data.cardId;
    },

    async addCardToDeck(data) {
        await $url.post('editing/decks/addcard', {userId, ...data})
    },

    async deleteCard(cardId) {
        return await $url.delete(END_POINT, {data: {userId, cardId}})
    },

    // async removeCardToDeck(data) {
    //     await $url.post('editing/decks/removecard', {userId, ...data})
    // },
};

export {EditorCardsService}
