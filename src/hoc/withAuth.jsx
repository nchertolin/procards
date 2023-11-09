import {IS_AUTH} from '../js/consts';
import ErrorPage from '../components/Pages/ErrorPage/ErrorPage';

export const WithAuth = Component => {
    const AuthHOC = (props) => {
        if (!IS_AUTH) {
            return <ErrorPage code='401' link='/signin' labelText='Войти'
                              message='Для просмотра этой страницы требуется авторизация.
         Войдите в существуйщий аккаунт или зарегистрируйтесь.'
            />
        }

        return <Component {...props} />
    }
    return AuthHOC;
}
