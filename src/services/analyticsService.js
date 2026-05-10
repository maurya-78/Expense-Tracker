import api from './api';

export const analyticService = {
  // Get high-level dashboard metrics (Burn Rate, Runway, Cash on Hand)
  getGlobalStats: async () => {
    const { data } = await api.get('/analytics/global');
    return data;
  },

  // Get historical burn rate data for chart visualization
  getBurnTrends: async (months = 6) => {
    const { data } = await api.get('/analytics/burn-trends', { params: { months } });
    return data;
  },

  // Get spending breakdown by category (Pie chart data)
  getCategoryBreakdown: async () => {
    const { data } = await api.get('/analytics/categories');
    return data;
  },

  // Trigger a predictive simulation for future runway based on current velocity
  runSimulations: async (params) => {
    const { data } = await api.post('/analytics/simulate', params);
    return data;
  }
};