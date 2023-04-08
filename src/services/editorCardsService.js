import axios from 'axios';
import { SERVER_URL, userId, reloadPage } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}/editing/cards/` });

const EditorCardsService = {
   async getCards(id, searchQuery) {
      return await url.get('', {
         data: { userId, deckId: id },
         params: { searchQuery }
      })
         .then(response => response.data.cards)
   },

   async editCard(data) {
      return await url.patch('', { userId, ...data })
         .then(() => reloadPage())
         .catch(error => alert(error))
   },

   async createCard(data) {
      return await url.post('', { userId, ...data })
         .then(() => reloadPage())
         .catch(error => alert(error))
   },

   async deleteCard(cardId) {
      return await url.delete('', { userId, cardId })
         .then(() => reloadPage())
         .catch(error => alert(error))
   },
}

export { EditorCardsService }
