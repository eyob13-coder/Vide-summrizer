import axios from 'axios';
import { BASE_URL } from './apiPath';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5 minutes for video uploads
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // Increase timeout for file uploads
    if (config.data instanceof FormData) {
      config.timeout = 600000; // 10 minutes for file uploads
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Only redirect to login if we're not already on an auth page
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath === '/login' || currentPath === '/signup';
        
        if (!isAuthPage) {
          // Clear invalid token
          localStorage.removeItem("token");
          // Redirect to login page
          window.location.href = "/login";
        }
      } else if (error.response.status === 500) {
        console.error("Server Error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      if (error.message.includes('timeout')) {
        console.error("Request timeout. Please try again or check your connection.");
      } else {
        console.error("Request was aborted. Please try again.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;