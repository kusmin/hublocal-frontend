import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_API, 
  timeout: 2000, 
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros headers globais aqui, se necessário
  },
});

// Interceptadores de solicitação e resposta podem ser adicionados aqui, se necessário
// axiosInstance.interceptors.request.use(...)
// axiosInstance.interceptors.response.use(...)

export default api;