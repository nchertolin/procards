import $url from "../api/api";
import {userId} from '../utils';


const END_POINT = 'decks';

const LearningDeckService = {
    async getDecks(searchQuery) {
        const response = await $url.get(END_POINT, {params: {userId, searchQuery}});

        return response.data.decks;
    },

    async getDeck(id) {
        const response = await $url.get(`${END_POINT}/deck`, {params: {userId, deckId: id}});
        return response.data
    },

    async addDeck({deckId, password}) {
        return await $url.post(`${END_POINT}/add`, {userId, deckId, password})
    },

    async deleteDeck(deckId) {
        return await $url.delete(`${END_POINT}/remove`, {data: {userId, deckId}})
    }
}

export {LearningDeckService}
