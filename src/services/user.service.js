import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://192.168.1.7:8080/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  updateSpinNumber(id) {
    return axios.put(`${API_URL}app/users/${id}/decrease-number-spin`, { headers: authHeader() });
  }

}

export default new UserService();
