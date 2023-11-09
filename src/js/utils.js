import {toast} from 'react-toastify';
import {confirmAlert} from "react-confirm-alert";
import {HOST} from "./consts";

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
const showConfirmAlert = (message, callback) => confirmAlert({
    title: 'Подтвердите действие',
    message,
    buttons: [
        {label: 'Да', onClick: callback},
        {label: 'Отмена'}
    ]
});

const setSavedTheme = () => {
    const isDarkMode = localStorage.getItem('dark-theme') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark');
    }
};

const generateInviteLink = (deckId) => `${HOST}/learn/add/${deckId}`;

const getImagesList = (frontImgFiles, backImgFiles) => {
    const frontImg = typeof frontImgFiles === 'string'
        ? frontImgFiles
        : frontImgFiles?.length
            ? URL.createObjectURL(frontImgFiles[0])
            : null;
    const backImg = typeof backImgFiles === 'string'
        ? backImgFiles
        : backImgFiles?.length
            ? URL.createObjectURL(backImgFiles[0])
            : null;
    return [frontImg, backImg];
};

export {
    clickOutsideHandler,
    redirectToMainPage,
    redirectToSignInPage,
    reloadPage,
    redirectToLearn,
    getPagesAmount,
    getPagesList,
    notifyError,
    notifySuccess,
    showConfirmAlert,
    setSavedTheme,
    generateInviteLink,
    getImagesList,
}
