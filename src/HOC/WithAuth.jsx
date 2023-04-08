import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'

export const WithAuth = Component => {
  const AuthHOC = (props) => {
    const { user } = useContext(AuthContext);
    if (!user || !localStorage.getItem('id')) {
      return <p>Вы не авторизованы.</p>
    }
    return <Component {...props} />
  }
  return AuthHOC;
}