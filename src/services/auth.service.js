import axios from 'axios'
import authHeader from './auth-header'

// const API_URL = 'http://192.168.1.16:8080/api/'
const API_URL = 'http://45.32.102.78:8080/api/'

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'app/admin/login', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(username, tel) {
    return axios
      .post(API_URL + 'app/users', {
        username,
        tel,
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.data))
        }
        return response.data
      })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getUserInfo(id) {
    return axios.get(API_URL + 'app/users/' + id, { headers: authHeader() })
  }
  updateSpinNumber(id) {
    return axios.put(
      API_URL + 'app/users/' + id + '/decrease-number-spin',
      {},
      { headers: authHeader() }
    )
  }
  getListPrizes() {
    return axios.get(API_URL + 'app/prizes')
  }
  getListUsers(role, id) {
    if (role === 'SUPER_ADMIN')
      return axios.get(API_URL + 'admin/users', { headers: authHeader() })
    else
      return axios.get(
        API_URL + 'admin/list-users-by',
        {
          params: {
            adminId: id,
          },
          headers: authHeader(),
        },
        {
          headers: authHeader(),
        }
      )
  }

  deleteUserById(id) {
    return axios.delete(API_URL + 'admin/users/' + id, {
      headers: authHeader(),
    })
  }

  getListAdmin() {
    return axios.get(API_URL + 'super-admin/admins', { headers: authHeader() })
  }

  getListAdminHistoryById(id, startDate, endDate) {
    return axios.get(`${API_URL}admin/${id}/histories`, {
      params: {
        startDate,
        endDate,
      },
      headers: authHeader(),
    })
  }

  createUser(username, tel, numberOfSpins, prize, adminId) {
    return axios.post(
      API_URL + 'admin/users',
      {
        username,
        prize,
        numberOfSpins,
        tel,
        adminId,
      },
      { headers: authHeader() }
    )
  }

  createAdmin(username, password) {
    return axios.post(
      API_URL + 'super-admin/admins',
      { username, password },
      { headers: authHeader() }
    )
  }

  updateUserById(id, numberOfSpins, prize, admin) {
    return axios.put(
      API_URL + 'admin/users/' + id,
      {
        numberOfSpins: numberOfSpins,
        prize: prize,
        adminId: admin,
      },
      { headers: authHeader() }
    )
  }

  updatePrizeById(id, name, imgUrl) {
    return axios.put(
      API_URL + 'super-admin/prizes/' + id,
      {
        name: name,
        imgUrl: imgUrl,
      },
      { headers: authHeader() }
    )
  }

  deletePrizeById(id) {
    return axios.delete(API_URL + 'super-admin/prizes/' + id, {
      headers: authHeader(),
    })
  }

  createPrize(name, imgUrl) {
    return axios.post(
      API_URL + 'super-admin/prizes',
      {
        name: name,
        imgUrl: imgUrl,
      },
      { headers: authHeader() }
    )
  }
}

export default new AuthService()
