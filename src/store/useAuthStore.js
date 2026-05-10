import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      user: null,
      token: null,
      isAuthenticated: false,
      isInitializing: true, // Controls the splash screen/loader

      // --- ACTIONS ---
      
      /**
       * Validates existing session on app load.
       * In the future, this is where you'd call an /api/me endpoint.
       */
      checkAuth: async () => {
        set({ isInitializing: true });
        
        // Add a tiny delay so the UI doesn't "jump"
        await new Promise((resolve) => setTimeout(resolve, 600));

        const { token, user } = get();
        
        if (token && user) {
          set({ isAuthenticated: true, isInitializing: false });
        } else {
          set({ isAuthenticated: false, isInitializing: false, user: null, token: null });
        }
      },

      /**
       * Call this after a successful Login or Register API call
       */
      setAuth: (user, token) => {
        set({ 
          user, 
          token, 
          isAuthenticated: !!token, 
          isInitializing: false 
        });
      },

      /**
       * Clears local storage and resets state
       */
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          isInitializing: false 
        });
        // Optional: clear any other specific app caches here
      },

      /**
       * Updates the current user profile data in the store
       */
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'stellar-auth-storage',
      storage: createJSONStorage(() => localStorage),
      // CRITICAL: only save these keys. 
      // Never save 'isInitializing' so it's always true on page reload.
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);