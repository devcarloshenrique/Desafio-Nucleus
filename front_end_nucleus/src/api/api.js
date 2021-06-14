import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/nucleus2/backend/public/api/',
  timeout: 1000,
});

export default api;
