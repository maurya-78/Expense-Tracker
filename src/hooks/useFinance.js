import { useMemo } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { useBankStore } from '../store/useBankStore';

export const useFinance = () => {
  const { expenses } = useFinanceStore();
  const { accounts } = useBankStore();

  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }, [accounts]);

  const monthlyBurn = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses
      .filter(exp => {
        const d = new Date(exp.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const runwayMonths = useMemo(() => {
    if (monthlyBurn <= 0) return Infinity;
    return (totalBalance / monthlyBurn).toFixed(1);
  }, [totalBalance, monthlyBurn]);

  return {
    totalBalance,
    monthlyBurn,
    runwayMonths,
    currencySymbol: '$'
  };
};