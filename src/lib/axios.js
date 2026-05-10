import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Dynamically injects the latest JWT from the Zustand store.
 */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles success and global error states (401, 403, 500).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong';

    if (status === 401) {
      // 1. Clear state in Zustand
      useAuthStore.getState().logout();
      
      // 2. We don't use window.location.href here. 
      // Our DashboardLayout/App.jsx will detect the state change 
      // and redirect to /login automatically via React Router.
      console.warn('[Auth]: Token expired or invalid. Logging out...');
    }

    if (status === 403) {
      console.error('[Auth]: You do not have permission for this action.');
    }

    if (status >= 500) {
      console.error('[Server]: Internal Server Error. Please try again later.');
    }

    // Attach the custom message to the error object so components can show it in Toasts
    error.message = message;
    return Promise.reject(error);
  }
);

export default api;