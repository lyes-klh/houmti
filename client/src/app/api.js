import axios from 'axios';

const houmtiApi = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default houmtiApi;
