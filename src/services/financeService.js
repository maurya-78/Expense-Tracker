import api from './api';

export const financeService = {
  // Get all expenses with optional filtering
  getExpenses: async (params) => {
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  // Log a new expense
  createExpense: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  // Get monthly burn analytics
  getMonthlyBurn: async () => {
    const response = await api.get('/analytics/burn');
    return response.data;
  },

  // Upload an invoice (multipart/form-data)
  uploadInvoice: async (id, file) => {
    const formData = new FormData();
    formData.append('invoice', file);
    const response = await api.post(`/expenses/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};