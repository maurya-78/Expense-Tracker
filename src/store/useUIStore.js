import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      // --- Sidebar State ---
      isSidebarOpen: true,
      isSidebarCollapsed: false,
      
      // --- Modal/Overlay States ---
      activeModal: null, // 'ADD_TRANSACTION', 'EDIT_PROFILE', etc.
      modalData: null,   // Context for the modal
      
      // --- Search & Filters ---
      globalSearchQuery: '',
      activeFilterTab: 'all',

      // --- Actions ---
      toggleSidebar: () => set((state) => ({ 
        isSidebarOpen: !state.isSidebarOpen 
      })),

      setSidebarCollapsed: (collapsed) => set({ 
        isSidebarCollapsed: collapsed 
      }),

      openModal: (modalName, data = null) => set({ 
        activeModal: modalName, 
        modalData: data 
      }),

      closeModal: () => set({ 
        activeModal: null, 
        modalData: null 
      }),

      setGlobalSearch: (query) => set({ 
        globalSearchQuery: query 
      }),

      setFilterTab: (tabId) => set({ 
        activeFilterTab: tabId 
      }),
    }),
    {
      name: 'ui-settings-storage',
      // We only persist preferences like sidebar collapse
      partialize: (state) => ({ 
        isSidebarCollapsed: state.isSidebarCollapsed 
      }),
    }
  )
);