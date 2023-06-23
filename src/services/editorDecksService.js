import $url from "../api/api";
import {userId} from '../utils';


const END_POINT = 'editing/decks';

const EditorDeckService = {
    async getDecks(searchQuery) {
        const response = await $url.get(END_POINT, {params: {userId, searchQuery}});
        return response.data.deckPreviews;
    },

    async editDeck(data) {
        return await $url.patch(END_POINT, {userId, ...data})
    },

    async editDeckPassword(data) {
        return await $url.patch(`${END_POINT}/password`, {userId, ...data})
    },

    async createDeck(data) {
        const response = await $url.post(END_POINT, {userId, ...data})
        return response.data.deckId;
    },

    async deleteDeck(id) {
        return await $url.delete(END_POINT, {data: {userId, deckId: id}})
    },
}

export {EditorDeckService}
