import api from './api';

export const authService = {
  // Authenticate user and return JWT + User profile
  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  // Create new company workspace and admin account
  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  // Verify current session and fetch latest user permissions
  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },

  // Trigger password reset workflow
  forgotPassword: async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  }
};