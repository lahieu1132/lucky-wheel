import axios from "axios";
import authHeader from './auth-header';
import { useNavigate } from "react-router-dom";

const API_URL = "http://104.238.181.73:8080/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "app/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    return axios.post(API_URL + "app/sign-up", {
      username,
      password
    }).then(response => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      
      return response.data;
    });;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getUserInfo (id) {
    return axios.get(API_URL + 'app/users/' + id, { headers: authHeader() } )
  }
  updateSpinNumber(id) {
    return axios.put(API_URL + 'app/users/' + id +"/decrease-number-spin", {} ,{ headers: authHeader() });
  }
  getListPrizes() {
    return axios.get(API_URL + "app/prizes");
  }
  getListUsers() {
    return axios.get(API_URL + 'admin/users', { headers: authHeader() });
  }

  updateUserById(id,numberOfSpins, prize){
    return axios.put(API_URL + 'admin/users/' + id,{
      numberOfSpins: numberOfSpins,
      prize: prize,
    }, { headers: authHeader() });
  }

  updatePrizeById(id,name, imgUrl){
    return axios.put(API_URL + 'admin/prizes/' + id,{
      name: name,
      imgUrl: imgUrl,
    }, { headers: authHeader() });
  }

  deletePrizeById(id) {
    return axios.delete(API_URL + 'admin/prizes/' + id,  { headers: authHeader() })
  }

  createPrize(name, imgUrl) {
    return axios.post(API_URL + 'admin/prizes', {
      name: name,
      imgUrl: imgUrl
    }, { headers: authHeader() } )
  }

}

export default new AuthService();
