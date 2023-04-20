import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({
   baseURL: `${SERVER_URL}/editing/decks/`,
   withCredentials: true,
   headers: {
      'Access-Control-Allow-Origin': '*'
   }
});

const EditorDeckService = {
   async getDecks(searchQuery) {
      const response = await url.get('', { params: { userId, searchQuery } });

      return response.data.deckPreviews;
   },

   async editDeck(data) {
      return await url.patch('', { userId, ...data })
   },

   async editDeckPassword(data) {
      return await url.patch('password', { userId, ...data })
   },

   async createDeck(data) {
      return await url.post('', { userId, ...data })
   },

   async deleteDeck(id) {
      return await url.delete('', { data: { userId, deckId: id } })
   },
}

export { EditorDeckService }
