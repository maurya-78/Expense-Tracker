import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  // If already logged in, don't show login page
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Branding - Only visible on LG screens and up */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 p-16 flex-col justify-between relative overflow-hidden">
        {/* Decorative Circle to prevent flat look */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500 rounded-full opacity-50 blur-3xl" />
        
        <div className="relative z-10">
          <span className="text-white font-bold text-xl tracking-tight">FINANCE.IO</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-white text-5xl font-extrabold leading-[1.1] mb-6">
            Manage your startup runway with precision.
          </h2>
          <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
            Join 2,000+ founders tracking burn rate, managing team budgets, and scaling with confidence.
          </p>
        </div>

        <div className="relative z-10 text-indigo-200 text-sm">
          © 2026 Stellar Finance Platform. All rights reserved.
        </div>
      </div>

      {/* Right Side: Login/Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;