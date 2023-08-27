import axios from 'axios';
import Cookies from 'js-cookie';

const axiosApi = axios.create();

axiosApi.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosApi;
