const SERVER_URL = '';
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
const reloadPage = () => window.location.reload();

export {
   SERVER_URL,
   isAuth,
   userId,
   clickOutsideHandler,
   redirectToMainPage,
   reloadPage,
}