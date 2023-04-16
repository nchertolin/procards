import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({
   baseURL: `${SERVER_URL}/editing/cards/`,
   withCredentials: true,
   headers: {
      'Access-Control-Allow-Origin': '*'
   }
});

const EditorCardsService = {
   async getCards(id, searchQuery) {
      const response = await url.get('', {
         params: { userId, deckId: id, searchQuery }
      })
      return response.data
   },

   async editCard(data) {
      return await url.patch('', { userId, ...data })
   },

   async createCard(data) {
      return await url.post('', { userId, ...data })
   },

   async deleteCard(cardId) {
      return await url.delete('', { userId, cardId })
   },
}

export { EditorCardsService }
