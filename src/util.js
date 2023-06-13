import {toast} from 'react-toastify';

const ORIGIN = window.location.origin;
const HOST = window.location.host;
// const SERVER_URL = ORIGIN + '/api';
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

const redirectToMainPage = () => window.location.href = '/';
const redirectToSignInPage = () => window.location.href = '/signin';
const redirectToLearn = () => window.location.href = '/learn';
const reloadPage = () => window.location.reload();

const getPagesAmount = (length, count = 20) => Math.max(Math.ceil(length / count), 1);

const getPagesList = (amount) => {
    const pages = [];
    for (let i = 1; i <= amount; i++) {
        pages.push(i);
    }
    return pages;
};

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

const getErrorDataWithoutUserId = error => {
    const data = JSON.parse(error.config.data);
    delete data.userId;
    return data
};


export {
    ORIGIN,
    HOST,
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
    getPagesList,
    notifyError,
    notifySuccess,
    setSavedTheme,
    getErrorDataWithoutUserId,
}
