import { toast } from 'react-toastify';

const SERVER_URL = 'https://localhost:7046';
const isAuth = localStorage.getItem('id') != null;
const userId = localStorage.getItem('id');

const clickOutsideHandler = (e, className, stateSetter, removeSelectedObj) => {
   if (!e.target.closest(className)) {
      stateSetter(false);
      if (removeSelectedObj) {
         removeSelectedObj()
      }
   }
};

const stopPropagation = e => e.stopPropagation();

const redirectToMainPage = () => window.location.href = '/';
const redirectToSignInPage = () => window.location.href = '/signin';
const redirectToLearn = () => window.location.href = '/learn';
const reloadPage = () => window.location.reload();

const getPagesAmount = (length, count = 20) => Math.ceil(length / count);


const notifyError = error => {
   if (error.response?.data) {
      toast.error(error.response.data.title);
      return;
   }
   toast.error(error.message);
}

export {
   SERVER_URL,
   isAuth,
   userId,
   clickOutsideHandler,
   redirectToMainPage,
   redirectToSignInPage,
   reloadPage,
   redirectToLearn,
   getPagesAmount,
   stopPropagation,
   notifyError,
}