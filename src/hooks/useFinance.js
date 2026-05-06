import { useMemo } from 'react';

/**
 * Custom hook to calculate financial KPIs
 * @param {Array} expenses - List of expense objects
 * @param {number} currentBalance - Total cash in bank
 */
export const useFinance = (expenses, currentBalance) => {
  return useMemo(() => {
    // Calculate Monthly Burn (Average of last 3 months or current month)
    const totalExpenses = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    
    // Simple burn calculation (total of provided expenses)
    const burnRate = totalExpenses; 
    
    // Runway = Cash / Monthly Burn
    const runway = burnRate > 0 ? (currentBalance / burnRate).toFixed(1) : "∞";

    // Financial Health Status
    let healthStatus = 'Healthy';
    if (runway < 3) healthStatus = 'Critical';
    else if (runway < 6) healthStatus = 'Warning';

    return {
      burnRate,
      runway,
      healthStatus,
      totalExpenses
    };
  }, [expenses, currentBalance]);
};