import axios from 'axios';
import { SERVER_URL, reloadPage, userId } from '../util';
import { testData } from '../testData';


const url = axios.create({ baseURL: `${SERVER_URL}/decks/` });

const LearningDeckService = {
   async getDecks(searchQuery) {
      return await url.get('', {
         data: { userId },
         params: { searchQuery }
      })
         .then(response => response.data.decks)
   },

   async getDeck(id) {
      return await url.get('deck', { userId, deckId: id })
         .then(response => response.data)
         .catch(error => testData.decks.find(({ deckId }) => deckId === id))
   },

   async addDeck({ deckId, password }) {
      return await url.post('deck', { userId, deckId, password })
         .then(() => reloadPage())
         .catch(error => console.error(error))
   },

   async deleteDeck(deckId) {
      return await url.delete('deck', { userId, deckId })
         .then(() => reloadPage())
         .catch(error => console.error(error))
   },

}

export { LearningDeckService }
