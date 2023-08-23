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

const Router = () => {
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
        <Route path="/admin/users" element={<BoardUser />} />
        <Route path="/admin/prize" element={<BoardPrize />} />
        <Route path="/admin/history" element={<BoardHistory />} />
      </Route>
    </Routes>
  )
}
export default Router
