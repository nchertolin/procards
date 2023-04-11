import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}/editing/cards/` });

const EditorCardsService = {
   async getCards(id, searchQuery) {
      const response = await url.get('', {
         data: { userId, deckId: id },
         params: { searchQuery }
      })
      return response.data.cards
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
