import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: [],
      monthlyBudget: 50000,
      currentBalance: 750000,
      isLoading: false,

      // Actions
      addTransaction: (transaction) => {
        const newTransaction = {
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString(),
          ...transaction,
        };

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
          // Deduct from balance if it's an expense
          currentBalance: state.currentBalance - (transaction.type === 'expense' ? transaction.amount : -transaction.amount)
        }));
      },

      deleteTransaction: (id) => {
        set((state) => {
          const transaction = state.transactions.find(t => t.id === id);
          if (!transaction) return state;

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
            currentBalance: state.currentBalance + (transaction.type === 'expense' ? transaction.amount : -transaction.amount)
          };
        });
      },

      // Computed Values (Getters)
      getMonthlyBurn: () => {
        const transactions = get().transactions;
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        return transactions
          .filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === thisMonth && d.getFullYear() === thisYear && t.type === 'expense';
          })
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getRunway: () => {
        const balance = get().currentBalance;
        const avgBurn = get().getMonthlyBurn() || 1; // Prevent division by zero
        return (balance / avgBurn).toFixed(1);
      }
    }),
    {
      name: 'finance-storage', // Persist data in local storage
    }
  )
);