import api from '../lib/axios';

const expenseService = {
  getAll: async (params) => {
    // params: { page, limit, category, teamId, search }
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  create: async (expenseData) => {
    // If expenseData contains a File, use FormData
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  update: async (id, expenseData) => {
    const response = await api.patch(`/expenses/${id}`, expenseData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  uploadReceipt: async (id, file) => {
    const formData = new FormData();
    formData.append('receipt', file);
    const response = await api.post(`/expenses/${id}/receipt`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

export default expenseService;