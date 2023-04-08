import axios from 'axios';
import { SERVER_URL, reloadPage, userId } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}/editing/decks/` });

const EditorDeckService = {
   async getDecks(searchQuery) {
      return await url.get('', {
         data: { userId },
         params: { searchQuery }
      })
         .then(response => response.data.decks)
   },

   async editDeck(data) {
      return await url.patch({ userId, ...data })
         .then(() => reloadPage())
         .catch(error => alert(error.message))
   },

   async editDeckPassword(data) {
      return await url.patch('password', { userId, ...data })
         .then(() => reloadPage())
         .catch(error => alert(error.message))
   },

   async createDeck(data) {
      return await url.post({ userId, ...data })
         .then(() => reloadPage())
         .catch(error => alert(error.message))
   },

   async deleteDeck(id) {
      return await url.delete({ userId, deckId: id })
         .then(() => reloadPage())
         .catch(error => alert(error.message))
   },
}

export { EditorDeckService }
