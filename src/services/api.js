import axios from 'axios';
import { useNotificationStore } from '../store/useNotificationStore';

/**
 * Global Axios Instance
 * Features: Base URL, 15s Timeout, Auth Headers, and Global Error Toasts.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches the JWT token from localStorage to every request.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * 1. Success: Passes the response through.
 * 2. 401 Error: Clears the session and redirects.
 * 3. General Error: Triggers a global notification toast.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // 1. Handle Global Notification Alert
    // This allows the user to see exactly what went wrong (e.g., "Insufficient funds", "Invalid input")
    useNotificationStore.getState().addNotification({
      message: error.response?.data?.message || 'Server connection failed. Please check your internet.',
      type: 'error',
      duration: 6000 // Error messages stay slightly longer for readability
    });

    // 2. Handle Session Expiration (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      localStorage.removeItem('token');
      
      // Redirect to login with a query param to trigger a "Session Expired" alert on the login page
      window.location.href = '/login?expired=true';
    }

    // 3. Log errors for debugging in development
    if (import.meta.env.DEV) {
      console.error(`[API Error] ${error.response?.status}:`, error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default api;