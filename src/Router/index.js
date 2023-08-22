import { Routes, Route, Link } from 'react-router-dom'
import Login from '../components/login.component'
import Register from '../components/register.component'
import Home from '../components/Home'
import BoardPrize from '../components/BoardPrize'
import BoardUser from '../components/BoardUser'
import BoardHistory from '../components/BoardHistory'
import BoardAdmin from '../components/BoardAdmin'
import LoginAdmin from '../components/LoginAdmin'
import PrivateRoute from './PrivateRoute'
import authService from '../services/auth.service'

const Router = () => {
  const admin = authService.getCurrentUser()
  console.log(admin)

  const isAdmin = () => {
    return admin.role === 'SUPER_ADMIN' || admin.role === 'ADMIN'
  }

  const isSupeerAdmin = () => {
    return admin.role === 'SUPER_ADMIN'
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <BoardAdmin />
          </PrivateRoute>
        }
      >
        <Route path="/admin/users" element={isAdmin && <BoardUser />} />
        <Route path="/admin/prize" element={isAdmin && <BoardPrize />} />
        <Route
          path="/admin/history"
          element={isSupeerAdmin && <BoardHistory />}
        />
      </Route>
    </Routes>
  )
}
export default Router
