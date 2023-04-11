import axios from 'axios';
import { SERVER_URL, reloadPage, userId } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}/decks/` });

const LearningDeckService = {
   async getDecks(searchQuery) {
      const response = await url.get('', {
         data: { userId }, params: { searchQuery }
      });

      return response.data.decks;
   },

   async getDeck(id) {
      const response = await url.get('deck', { userId, deckId: id });

      return response.data
   },

   async addDeck({ deckId, password }) {
      return await url.post('deck', { userId, deckId, password })
   },

   async deleteDeck(deckId) {
      return await url.delete('deck', { userId, deckId })
      // .then(() => reloadPage())
      // .catch(error => alert(error.message))
   },

}

export { LearningDeckService }
