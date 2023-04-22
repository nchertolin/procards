import {toast} from 'react-toastify';

const SERVER_URL = 'https://localhost:7046';
const isAuth = localStorage.getItem('id') != null;
const userId = localStorage.getItem('id');
const IS_DARK_THEME = localStorage.getItem('dark-theme') === 'true';

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

const getPagesAmount = (length, count = 20) => Math.max(Math.ceil(length / count), 1);

const notifyError = error => {
    if (error.response?.data) {
        toast.error(error.response.data.title);
        return;
    }
    toast.error(error.message);
};

const notifySuccess = (message = 'Успешно') => toast.success(message);

const setSavedTheme = () => {
    if (IS_DARK_THEME) {
        document.body.classList.add('dark');
    }
};


export {
    SERVER_URL,
    IS_DARK_THEME,
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
    notifySuccess,
    setSavedTheme,
}