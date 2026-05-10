import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      // --- State ---
      transactions: [],
      monthlyBudget: 50000,
      currentBalance: 750000,
      isLoading: false,

      // --- Actions ---
      
      /**
       * Adds a new transaction and automatically updates the liquid balance.
       */
      addTransaction: (transaction) => {
        const newTransaction = {
          id: crypto.randomUUID(), // More robust than Math.random()
          date: new Date().toISOString(),
          ...transaction,
        };

        set((state) => {
          const isExpense = transaction.type === 'expense';
          const balanceAdjustment = isExpense ? -transaction.amount : transaction.amount;
          
          return {
            transactions: [newTransaction, ...state.transactions],
            currentBalance: state.currentBalance + balanceAdjustment
          };
        });
      },

      /**
       * Removes a transaction and reverts the impact on the balance.
       */
      deleteTransaction: (id) => {
        set((state) => {
          const transaction = state.transactions.find(t => t.id === id);
          if (!transaction) return state;

          const isExpense = transaction.type === 'expense';
          // If we delete an expense, we add money back; if we delete income, we remove it.
          const balanceReversal = isExpense ? transaction.amount : -transaction.amount;

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
            currentBalance: state.currentBalance + balanceReversal
          };
        });
      },

      setLoading: (status) => set({ isLoading: status }),

      // --- Computed Values (Getters) ---

      /**
       * Calculates the total expenses for the current calendar month.
       */
      getMonthlyBurn: () => {
        const { transactions } = get();
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        return transactions
          .filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === thisMonth && 
                   d.getFullYear() === thisYear && 
                   t.type === 'expense';
          })
          .reduce((sum, t) => sum + t.amount, 0);
      },

      /**
       * Estimates how many months the startup has left until $0 cash.
       */
      getRunway: () => {
        const balance = get().currentBalance;
        const avgBurn = get().getMonthlyBurn();
        
        if (!avgBurn || avgBurn <= 0) return '∞';
        return (balance / avgBurn).toFixed(1);
      }
    }),
    {
      name: 'finance-storage', // Key for LocalStorage
      // Optional: partialize allows you to choose what to save. 
      // Useful if you don't want to save "isLoading" status.
      partialize: (state) => ({ 
        transactions: state.transactions, 
        currentBalance: state.currentBalance,
        monthlyBudget: state.monthlyBudget
      }),
    }
  )
);