import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happy-api-v2.herokuapp.com',
});

export default api;