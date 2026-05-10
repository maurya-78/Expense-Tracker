import api from './api';

export const expenseService = {
  // Fetch paginated expenses with dynamic filters (date range, category, status)
  getExpenses: async (filters = {}) => {
    const { data } = await api.get('/expenses', { params: filters });
    return data;
  },

  // Record a new transaction
  createExpense: async (expenseData) => {
    const { data } = await api.post('/expenses', expenseData);
    return data;
  },

  // Update existing expense (e.g., mark as "Paid" or "Reconciled")
  updateExpense: async (id, update) => {
    const { data } = await api.patch(`/expenses/${id}`, update);
    return data;
  },

  // Delete an expense (Admin only)
  deleteExpense: async (id) => {
    await api.delete(`/expenses/${id}`);
  }
};