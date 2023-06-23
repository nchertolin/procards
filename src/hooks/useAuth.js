import {useMutation} from '@tanstack/react-query'
import {AuthService} from '../services/authService';
import {redirectToMainPage, redirectToSignInPage} from '../utils';

const setId = (id) => localStorage.setItem('id', id);
const onSuccess = (id) => {
    setId(id);
    redirectToMainPage();
};


const useSignIn = () => {
    const {isLoading, mutate: signIn} = useMutation(
        async (data) => await AuthService.signIn(data),
        {
            onSuccess,
        }
    );

    return {isLoading, signIn};
};

const useSignUp = () => {
    const {isLoading, mutate: signUp} = useMutation(
        async (data) => await AuthService.signUp(data),
        {
            onSuccess
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
            }
        }
    );

    return {isLoading, recovery};
};

const useNewPassword = () => {
    const {isLoading: isLoading1, mutate: setNewPassword} = useMutation(
        async (data) => await AuthService.setNewPassword(data),
        {
            onSuccess: () => redirectToSignInPage(),
        }
    );

    return {isLoading: isLoading1, setNewPassword};
};

export {useSignIn, useSignUp, useRecovery, useNewPassword}
