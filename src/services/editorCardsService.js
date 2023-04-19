import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({
   baseURL: `${SERVER_URL}/editing/cards`,
   withCredentials: true,
   headers: {
      'Access-Control-Allow-Origin': '*'
   }
});

const imagesUrl = axios.create({
   baseURL: `${SERVER_URL}/images`,
   withCredentials: true,
   headers: {
      'Access-Control-Allow-Origin': '*'
   }
});

export const EditorCardsService = {
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
      const response = await url.post('', { userId, ...data })
      return response.data.cardId;
   },

   async deleteCard(cardId) {
      return await url.delete('', { userId, cardId })
   },

   async getImage({ deckId, cardId, side }) {
      const response = await imagesUrl.get('', {
         params: {
            userId,
            deckId,
            cardId,
            side
         }
      });
      return response.image
   },

   async addImage({ cardId, formData, side }) {
      return await imagesUrl.post('', formData, {
         params: {
            userId,
            cardId,
            side: side ? 'Front' : 'Back',
         }
      })
   },

   async deleteImage({ cardId, side }) {
      return await imagesUrl.delete('', { userId, cardId, side: side ? 'Front' : 'Back' })
   },
};
