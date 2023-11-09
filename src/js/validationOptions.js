const requiredMessage = 'Обязательноe поле.';

const REQUIRED_FIELD = {
    required: requiredMessage,
};

const CARD_SIDE_TEXT_OPTIONS = {
    ...REQUIRED_FIELD,
    pattern: {
        value: /^(?=^.{1,800}$)/,
        message: 'Максимум 800 символов.'
    }
};

const USER_OPTIONS = {
    LOGIN: {
        ...REQUIRED_FIELD,
        maxLength: {
            value: 30,
            message: 'Максимальная длина 30 символов.'
        }
    },
    EMAIL: {
        ...REQUIRED_FIELD,
        maxLength: {
            value: 100,
            message: 'Максимальная длинна 100 символов'
        },
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Некорректный адрес эл. почты'
        }
    },
    NAME: {
        ...REQUIRED_FIELD,
        maxLength: {
            value: 50,
            message: 'Максимальная длина 30 символов.'
        }
    },
    LOCATION: {
        ...REQUIRED_FIELD,
        maxLength: {
            value: 50,
            message: 'Максимальная длина 30 символов.'
        }
    },
    PASSWORD: {
        ...REQUIRED_FIELD,
        pattern: {
            value: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message: 'Минимум 8 символов, 1 цифра, заглавная и строчная буквы.'
        }
    },
};

const DECK_OPTIONS = {
    NAME: {
        ...REQUIRED_FIELD,
        maxLength: {
            value: 40,
            message: 'Максимальная длина 40 символов'
        }
    },
    PASSWORD: {
        ...REQUIRED_FIELD,
        pattern: {
            value: /^(?=^.{2,100}$)/,
            message: 'Минимум 2 символа.'
        },
    },
    DESCRIPTIONS: {
        ...REQUIRED_FIELD,
        maxLength: {
            value: 300,
            message: 'Максимальная длина 300 символов'
        }
    }
}

export {
    REQUIRED_FIELD,
    CARD_SIDE_TEXT_OPTIONS,
    USER_OPTIONS,
    DECK_OPTIONS,
}
