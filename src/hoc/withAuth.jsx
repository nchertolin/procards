import {isAuth} from '../utils';
import ErrorPage from '../components/Pages/ErrorPage/ErrorPage';

export const WithAuth = Component => {
    const AuthHOC = (props) => {
        if (!isAuth) {
            return <ErrorPage code='401' link='/signin' labelText='Войти'
                              message='Для просмотра этой страницы требуется авторизация.
         Войдите в существуйщий аккаунт или зарегистрируйтесь.'
            />
        }

        return <Component {...props} />
    }
    return AuthHOC;
}
