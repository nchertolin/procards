import axios from 'axios';
import { SERVER_URL, userId } from '../util';
import { testData } from '../testData';


const url = axios.create({ baseURL: `${SERVER_URL}/users/` });

const UserService = {
   async getStatistic() {
      return await url.get('preview', { userId })
         .then(response => response.data)
         .catch(error => console.error(error))
   },

   async getInfo() {
      return await url.get('profile', { userId })
         .then(response => response.data)
         .catch(error => testData)
   },

   async editInfo(data) {
      return await url.patch('profile', { userId, ...data })
         // .then(response => response.data)
         .catch(error => console.error(error))
   },

   async editPassword({ oldPassword, newPassword }) {
      return await url.patch('password', { userId, oldPassword, newPassword })
         // .then(response => response.data)
         .catch(error => console.error(error))
   },
}

export { UserService }
