import axios from 'axios'
import { SERVER_URL, redirectToMainPage } from '../util'

const url = axios.create({ baseURL: `${SERVER_URL}/account/` });
const setId = (id) => localStorage.setItem('id', id);
const onSuccsess = (id) => {
  setId(id);
  redirectToMainPage();
}

const AuthService = {
  async signIn(data) {
    return await url.post('login', data)
      .then(response => onSuccsess(response.data.id))
      .catch(() => setId('3fa85f64-5717-4562-b3fc-2c963f66afa6'))
  },

  async signUp(data) {
    return await url.post('register', data)
      .then(response => onSuccsess(response.data.id))
      .catch(() => setId('3fa85f64-5717-4562-b3fc-2c963f66afa6'))
  },

  async passwordRecovery(data, isEmailSended) {
    return await url.post(`recovery${isEmailSended ? '/code' : ''}`, data)
      .catch(error => console.error(error))
  },

  async setNewPassword(data) {
    return await url.post('recovery/newpass', data)
      .then(response => onSuccsess(response.data.result))
      .catch(error => console.error(error))
  },

  logout() {
    localStorage.removeItem('id');
  },
};

export { AuthService };
