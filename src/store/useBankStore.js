import { create } from 'zustand';

export const useBankStore = create((set) => ({
  accounts: [
    { id: '1', name: 'Main Operating', balance: 450000, bank: 'Mercury' },
    { id: '2', name: 'Payroll Reserve', balance: 120000, bank: 'SVB' }
  ],
  
  updateBalance: (id, newBalance) => set((state) => ({
    accounts: state.accounts.map(acc => 
      acc.id === id ? { ...acc, balance: newBalance } : acc
    )
  })),

  addAccount: (account) => set((state) => ({
    accounts: [...state.accounts, account]
  }))
}));