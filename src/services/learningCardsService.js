import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}cards/` });

const LearningCardsService = {
   async getCards(id) {
      const response = await url.get('', { userId, deckId: id })

      return response.data.cards;
   },

   async postGrade(data) {
      return await url.post('grade', { userId, ...data })
   },
}

export { LearningCardsService }
