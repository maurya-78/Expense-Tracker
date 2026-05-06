import api from '../lib/axios';

const analyticsService = {
  getBurnTrend: async (range = '6m') => {
    const response = await api.get('/analytics/burn-trend', { params: { range } });
    return response.data;
  },

  getCategoryDistribution: async () => {
    const response = await api.get('/analytics/categories');
    return response.data;
  },

  getRunwayForecast: async () => {
    const response = await api.get('/analytics/runway-forecast');
    return response.data;
  }
};

export default analyticsService;