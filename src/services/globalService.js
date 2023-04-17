import axios from 'axios'
import { SERVER_URL } from '../util'

const url = axios.create({
   baseURL: `${SERVER_URL}/statistic/`,
   withCredentials: true,
   headers: {
      'Access-Control-Allow-Origin': '*'
   }
});


const GlobalService = {

   async getStatistics() {
      const response = await url.get('');
      return response.data.statistics;
   },

};

export { GlobalService };