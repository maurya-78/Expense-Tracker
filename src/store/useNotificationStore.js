import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],

  /**
   * Adds a notification to the queue.
   * @param {Object} notification - { message, type: 'success' | 'error' | 'warning' | 'info', duration: number }
   */
  addNotification: (notification) => {
    const id = crypto.randomUUID();
    const newNotification = {
      id,
      type: 'info', // Default type
      duration: 5000, // Default 5 seconds
      ...notification,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    if (newNotification.duration !== Infinity) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }
  },

  /**
   * Removes a specific notification by ID.
   */
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  /**
   * Clears all active notifications.
   */
  clearAll: () => set({ notifications: [] }),
}));

// Shortcut helper for get() inside the store if needed
const get = () => useNotificationStore.getState();