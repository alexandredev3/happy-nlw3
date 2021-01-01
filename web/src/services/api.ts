import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happy-api-v3.herokuapp.com',
});

export default api;