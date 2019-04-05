import axios from 'axios';
import store from '../redux/store';

const { API_URL } = process.env;
const { token } = store.getState().user;

const http = axios.create({
  baseURL: API_URL || 'http://localhost:3000/api/v1',
  headers: {
    Authorization: token || localStorage.getItem('token') || undefined,
  },
});

export default http;