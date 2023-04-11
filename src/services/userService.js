import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({ baseURL: `${SERVER_URL}/users/` });

const UserService = {
   async getStatistic() {
      const response = await url.get('preview', { userId });
      return response.data;
   },

   async getInfo() {
      const response = await url.get('profile', { userId });

      return response.data;
   },

   async editInfo(data) {
      return await url.patch('profile', { userId, ...data })
   },

   async editPassword({ oldPassword, newPassword }) {
      return await url.patch('password', { userId, oldPassword, newPassword })
   },
}

export { UserService }
