import {useMutation} from '@tanstack/react-query'
import {AuthService} from '../services/authService';
import {notifyError, redirectToMainPage, redirectToSignInPage} from '../util';

const setId = (id) => localStorage.setItem('id', id);
const onSuccess = (id) => {
    setId(id);
    redirectToMainPage();
};

const onError = error => notifyError(error);

const useSignIn = () => {
    const {isLoading, mutate: signIn} = useMutation(
        async (data) => await AuthService.signIn(data),
        {
            onSuccess,
            onError
        }
    );

    return {isLoading, signIn};
};

const useSignUp = () => {
    const {isLoading, mutate: signUp} = useMutation(
        async (data) => await AuthService.signUp(data),
        {
            onSuccess,
            onError
        }
    );

    return {isLoading, signUp};
};

const useRecovery = (isLoginSent, setCodeSent) => {
    const {isLoading, mutateAsync: recovery} = useMutation(
        async ({data, isLoginSent}) =>
            await AuthService.recovery(data, isLoginSent),
        {
            onSuccess: () => {
                if (isLoginSent) {
                    setCodeSent(true);
                }
            },
            onError
        }
    );

    return {isLoading, recovery};
};

const useNewPassword = () => {
    const {isLoading: isLoading1, mutate: setNewPassword} = useMutation(
        async (data) => await AuthService.setNewPassword(data),
        {
            onSuccess: () => redirectToSignInPage(),
            onError,
        }
    );

    return {isLoading: isLoading1, setNewPassword};
};

export {useSignIn, useSignUp, useRecovery, useNewPassword}