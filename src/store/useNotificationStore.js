import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  toasts: [],
  
  // variant: 'default' | 'destructive' | 'success'
  addToast: ({ title, message, variant = 'default' }) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, title, message, variant }]
    }));

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }, 5000);
  },

  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  }))
}));