import AuthService from '../services/auth.service'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const user = AuthService.getCurrentUser()
  return user ? <>{children}</> : <Navigate to="/admin/login" />
}

export default PrivateRoute
