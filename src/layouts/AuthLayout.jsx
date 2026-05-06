import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  // Redirect to dashboard if user is already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-950">
      {/* Left Side: Branding/Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-600 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold italic tracking-tighter">FINANCE.IO</h1>
        </div>
        
        <div className="relative z-10 max-w-md">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold leading-tight"
          >
            Manage your startup runway with precision.
          </motion.h2>
          <p className="mt-6 text-indigo-100 text-lg">
            Join 2,000+ founders tracking burn rate, managing team budgets, and scaling with confidence.
          </p>
        </div>

        <div className="relative z-10 flex gap-8 text-indigo-200 text-sm font-medium">
          <span>© 2026 Startup Finance Platform</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-indigo-400 rounded-full blur-2xl opacity-30" />
      </div>

      {/* Right Side: Form Container */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Outlet renders the Auth form (Login/Register) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;