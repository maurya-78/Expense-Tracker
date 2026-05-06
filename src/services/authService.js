import api from '../lib/axios';

const authService = {
  login: async (credentials) => {
    // credentials: { email, password }
    const response = await api.post('/auth/login', credentials);
    return response.data; // { user: {...}, token: "..." }
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
    return response.data;
  }
};

export default authService;