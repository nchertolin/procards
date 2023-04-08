import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}cards/` });

const LearningCardsService = {
   async getCards(id) {
      return await url.get('', { userId, deckId: id })
         .then(response => response.data.cards)
         .catch(error => console.error(error))
   },

   async postGrade({ deckId, cardId, grade, timeInSeconds }) {
      return await url.post('', { userId, deckId, cardId, grade, timeInSeconds })
         .catch(error => console.error(error))
   },

}

export { LearningCardsService }
