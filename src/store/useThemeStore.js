import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,

      // Simplified Actions: Only handle the state change
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setTheme: (mode) => set({ isDarkMode: mode === 'dark' }),
    }),
    {
      name: 'theme-storage',
      // This function runs every time the store is loaded or changed
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Sync the HTML class with the stored value on page load
          if (state.isDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
    }
  )
);

// This listener handles theme changes WHILE the app is running
useThemeStore.subscribe((state) => {
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});