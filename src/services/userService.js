import axios from 'axios';
import { SERVER_URL, userId } from '../util';


const url = axios.create({
   baseURL: `${SERVER_URL}/users/`,
   withCredentials: true,
   headers: {
      'Access-Control-Allow-Origin': '*'
   }
});

const UserService = {
   async getStatistic(id) {
      const response = await url.get('preview', { params: { userId: id } });
      return response.data;
   },

   async getInfo(id) {
      const response = await url.get('profile', { params: { userId: id } });

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
