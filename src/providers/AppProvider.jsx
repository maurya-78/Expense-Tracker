import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { LayoutProvider } from '../context/LayoutContext';
import { SocketProvider } from '../context/SocketContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Initialize React Query for efficient data fetching/caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LayoutProvider>
          <SocketProvider>
            {/* The children is your App.jsx */}
            {children}
            
            {/* Global UI Elements */}
            <Toaster position="top-right" reverseOrder={false} />
          </SocketProvider>
        </LayoutProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};