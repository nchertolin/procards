import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}cards/` });

const LearningCardsService = {
   async getCards(id) {
      const response = await url.get('', { userId, deckId: id })

      return response.data.cards;
   },

   async postGrade({ deckId, cardId, grade, timeInSeconds }) {
      return await url.post('grade', { userId, deckId, cardId, grade, timeInSeconds })
   },

}

export { LearningCardsService }
