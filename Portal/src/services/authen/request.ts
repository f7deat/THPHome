import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://authen.dhhp.edu.vn/api/'
});

// Request Interceptor 1: Add Authorization Token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('thp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor 1: Handle Global Errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access
      // For example, redirect to login
    }
    return Promise.reject(error);
  },
);

// Response Interceptor 2: Transform Response Data
instance.interceptors.response.use(
  (response) => {
    // For example, extract data from response
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance as any;
