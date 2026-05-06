import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import { useThemeStore } from './store/useThemeStore';
import { useAuthStore } from './store/useAuthStore';

import { Toaster } from './components/ui/toaster';

/**
 * Root Application Component
 */
function App() {
  const { isDarkMode } = useThemeStore();

  // Safe fallback if auth store is incomplete
  const authStore = useAuthStore?.() || {};

  // Prevent crash if initializeAuth does not exist
  const initializeAuth = authStore.initializeAuth || (() => {});

  /**
   * Initialize Auth
   */
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Sync Theme
   */
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? 'dark' : ''
      } min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300`}
    >
      <Router>
        <AppRoutes />

        <Toaster />
      </Router>
    </div>
  );
}

export default App;