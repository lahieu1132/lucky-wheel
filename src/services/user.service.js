import axios from 'axios'
import authHeader from './auth-header'

// const API_URL = 'http://192.168.1.16:8080/api/'
const API_URL = 'http://64.176.45.22:8080/api/'

class UserService {
  loginUser(username, tel) {
    return axios
      .post(API_URL + 'app/login', { username, tel })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.data))
        }
        return response.data
      })
  }

  getUserInfo(name) {
    return axios.get(API_URL + 'app/users', {
      params: {
        name,
      },
    })
  }

  getUserHistory(id) {
    return axios.get(API_URL + 'app/users/' + id + '/histories', {
      headers: authHeader(),
    })
  }
}

export default new UserService()
