import axios from 'axios';
import AuthService from "../service/AuthService";

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_API, 
  timeout: 2000, 
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros headers globais aqui, se necessário
  },
});

api.interceptors.request.use((config) => {
    let token = AuthService.token();
    if (token) {
        config.headers.Authorization = token
    }
    return config;
})

api.interceptors.response.use( (response)  => {
    return response
}, (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      AuthService.logout();
      window.location = "/";
    }
    return Promise.reject(error)
})

export default api;