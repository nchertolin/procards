const SERVER_URL = 'http://localhost:7046';
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

const redirectToMainPage = () => window.location.href = '/';
const redirectToSignInPage = () => window.location.href = '/signin';
const redirectToLearn = () => window.location.href = '/learn';
const reloadPage = () => window.location.reload();

const getPagesAmount = (length, count = 20) => Math.ceil(length / count);

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
}