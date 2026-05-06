import api from '../lib/axios';

const teamService = {
  getTeams: async () => {
    const response = await api.get('/teams');
    return response.data;
  },

  getTeamDetails: async (id) => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },

  getEmployees: async () => {
    const response = await api.get('/employees');
    return response.data;
  },

  assignEmployeeToTeam: async (employeeId, teamId) => {
    const response = await api.post('/teams/assign', { employeeId, teamId });
    return response.data;
  }
};

export default teamService;