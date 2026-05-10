/**
 * Calculates the total burn rate for a given period.
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} - The sum of all amounts
 */
export const calculateBurnRate = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) return 0;
  
  return transactions.reduce((acc, curr) => {
    // Ensure we are working with numbers even if the API returns strings
    const amount = typeof curr.amount === 'string' ? parseFloat(curr.amount) : curr.amount;
    return acc + (amount || 0);
  }, 0);
};

/**
 * Predicts runway in months based on current balance and burn rate.
 * @param {number} balance - Current cash in hand
 * @param {number} burnRate - Monthly burn
 * @returns {number} - Months of life remaining (capped at 999 for infinity)
 */
export const calculateRunway = (balance, burnRate) => {
  if (!burnRate || burnRate <= 0) return 999; 
  
  const runway = balance / burnRate;
  
  // Return as a number with 1 decimal point precision
  return parseFloat(runway.toFixed(1));
};

/**
 * Determines financial health status based on runway duration.
 * Standard VC Benchmarks:
 * - 12+ Months: Healthy (Time to focus on growth)
 * - 6-12 Months: Warning (Time to start fundraising)
 * - <6 Months: Critical (Immediate cost-cutting or emergency funding needed)
 * 
 * @param {number} runway 
 * @returns {'healthy' | 'warning' | 'critical'}
 */
export const getFinancialHealthStatus = (runway) => {
  if (runway >= 12) return 'healthy';
  if (runway >= 6) return 'warning';
  return 'critical';
};

/**
 * Helper to get the Tailwind CSS classes associated with a health status.
 * Useful for dynamic styling of status badges.
 */
export const getHealthColorClass = (status) => {
  const mapping = {
    healthy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return mapping[status] || 'bg-gray-100 text-gray-700';
};