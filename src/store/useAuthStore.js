import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      // role: 'founder' | 'finance_manager' | 'team_lead' | 'employee'
      login: (userData, token) => set({ 
        user: userData, 
        token, 
        isAuthenticated: true 
      }),
      
      logout: () => {
        // Clear sensitive data on logout
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('auth-storage');
      },

      updateProfile: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      }))
    }),
    { name: 'auth-storage' }
  )
);