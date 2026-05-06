import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      isSidebarOpen: true,
      activeModal: null, // 'expense', 'team', 'delete', null

      toggleTheme: () => set((state) => {
        const nextMode = !state.isDarkMode;
        if (nextMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { isDarkMode: nextMode };
      }),

      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      
      openModal: (modalName) => set({ activeModal: modalName }),
      closeModal: () => set({ activeModal: null }),
    }),
    { name: 'ui-storage' }
  )
);