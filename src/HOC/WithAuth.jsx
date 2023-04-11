import { isAuth } from '../util';
import ErrorPage from '../components/ErrorPage/ErrorPage';

export const WithAuth = Component => {
   const AuthHOC = (props) => {
      if (!isAuth) {
         return <ErrorPage code='401' link='/signin' labelText='Войти'
            message='Для просмотра этой страница требуется авторизация. 
         Войдите в существуйщий аккаунт или зарегистрируйтесь.'
         />
      }

      return <Component {...props} />
   }
   return AuthHOC;
}