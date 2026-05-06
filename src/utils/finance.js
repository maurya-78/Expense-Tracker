/**
 * Calculates the monthly burn rate based on a set of expenses
 * @param {Array} expenses 
 * @returns {number}
 */
export const calculateBurnRate = (expenses) => {
  if (!expenses || expenses.length === 0) return 0;
  return expenses.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
};

/**
 * Predicts runway in months
 * @param {number} balance - Current cash in hand
 * @param {number} burnRate - Monthly burn
 * @returns {number} 
 */
export const calculateRunway = (balance, burnRate) => {
  if (burnRate <= 0) return 999; // Represents infinite runway
  const runway = balance / burnRate;
  return parseFloat(runway.toFixed(1));
};

/**
 * Determines financial health status based on runway
 * @param {number} runway 
 * @returns {string} 'healthy' | 'warning' | 'critical'
 */
export const getFinancialHealthStatus = (runway) => {
  if (runway >= 12) return 'healthy';
  if (runway >= 6) return 'warning';
  return 'critical';
};