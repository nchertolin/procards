const HOST = window.location.host;
const IS_AUTH = localStorage.getItem('id') != null;
const userId = localStorage.getItem('id');
const IS_DARK_MODE = localStorage.getItem('dark-theme') === 'true';

const AVATARS_AMOUNT = 30;
const AMOUNT_ON_PAGE = {
    DECKS: 16,
    DECKS_EDITOR: 15,
    CARDS_EDITOR: 15
}

export {
    HOST,
    IS_DARK_MODE,
    IS_AUTH,
    AVATARS_AMOUNT,
    AMOUNT_ON_PAGE,
    userId,
}
