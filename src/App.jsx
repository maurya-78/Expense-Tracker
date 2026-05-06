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
  // Use a selector for better performance
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  /**
   * Initialize Auth on Mount
   */
  useEffect(() => {
    if (initializeAuth) {
      initializeAuth();
    }
  }, [initializeAuth]);

  /**
   * Sync Theme - Ensures the 'dark' class is present on the document root.
   * This is redundant but helpful if the store rehydrates after the initial render.
   */
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    // 'dark' class here ensures components using Tailwind's dark: variants respond correctly
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Router>
          <AppRoutes />
          
          {/* Global UI Components */}
          <Toaster />
        </Router>
      </div>
    </div>
  );
}

export default App;