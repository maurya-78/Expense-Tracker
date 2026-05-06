import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      // State: Default to 'light' or system preference
      isDarkMode: false,

      // Actions
      toggleTheme: () => 
        set((state) => {
          const newMode = !state.isDarkMode;
          
          // Apply/Remove the 'dark' class from the document root
          // This allows Tailwind's dark: utility classes to work
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          return { isDarkMode: newMode };
        }),

      setTheme: (mode) => {
        const isDark = mode === 'dark';
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: 'theme-storage', // Key name for LocalStorage
    }
  )
);