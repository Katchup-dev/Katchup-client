import axios from 'axios';

const baseInstance = axios.create({
  baseURL: ``,
  headers: {
    'Content-Type': 'application/json',
  },
});
