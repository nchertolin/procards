import axios from 'axios'
import { SERVER_URL, redirectToSignInPage, reloadPage } from '../util'

const url = axios.create({ baseURL: `${SERVER_URL}/account/` });


const AuthService = {
   async signIn(data) {
      const response = await url.post('login', data);
      return response.data.id
   },

   async signUp(data) {
      const response = await url.post('register', data);
      return response.data.id
   },

   async recovery(data, isEmailSended) {
      return await url.post(`recovery${isEmailSended ? '/code' : ''}`, data)
   },

   async setNewPassword(data) {
      return await url.post('recovery/newpass', data)
   },

   logout() {
      localStorage.removeItem('id');
      reloadPage();
      redirectToSignInPage();
   },
};

export { AuthService };
