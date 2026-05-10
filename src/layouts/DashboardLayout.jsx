import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { useUIStore } from '../store/useUIStore';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../utils/cn';

const DashboardLayout = () => {
  // 1. Auth State - Security Layer
  const { isAuthenticated, isInitializing } = useAuthStore();

  // 2. UI State - Layout Layer
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  // --- SECURITY CHECKS ---

  // While checking the JWT or session on refresh, show a simple loader
  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // --- RENDER LAYOUT ---

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar} 
        />
      )}

      {/* Sidebar - Desktop and Mobile Drawer */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar contains the Hamburger menu for mobile */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
            {/* Pages like Overview, Transactions, etc. render here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;