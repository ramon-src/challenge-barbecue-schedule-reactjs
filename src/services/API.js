import axios from 'axios';

let axiosCreated = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});

export default {
  get: axiosCreated.get,
  post: axiosCreated.post,
  delete: axiosCreated.delete,
  put: axiosCreated.put
};
