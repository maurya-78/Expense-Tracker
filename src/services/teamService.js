import api from './api';

/**
 * Team Service: Manages the organizational hierarchy and departmental budgeting.
 */
export const teamService = {
  /**
   * Fetches all departments with their associated summary metrics.
   * Useful for the high-level Teams list view.
   */
  getTeams: async () => {
    const { data } = await api.get('/teams');
    return data;
  },

  /**
   * Fetches detailed information for a single department.
   * Includes headcount, budget allocation, and specific member data.
   */
  getTeamById: async (id) => {
    const { data } = await api.get(`/teams/${id}`);
    return data;
  },

  /**
   * Creates a new cost center (department).
   * Used during onboarding or company expansion.
   */
  createTeam: async (teamData) => {
    const { data } = await api.post('/teams', teamData);
    return data;
  },

  /**
   * Updates department details, such as changing the manager
   * or adjusting the monthly budget cap.
   */
  updateTeam: async (id, update) => {
    const { data } = await api.patch(`/teams/${id}`, update);
    return data;
  },

  /**
   * Fetches payroll-specific analytics for a team.
   * Helps calculate the 'Personnel' portion of the burn rate.
   */
  getTeamPayroll: async (id) => {
    const { data } = await api.get(`/teams/${id}/payroll`);
    return data;
  }
};