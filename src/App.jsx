import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// 1. Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// 2. Dashboard & Analytics
import Overview from './pages/dashboard/Overview';
import Analytics from './pages/analytics/Analytics';

// 3. Finance & Management
import Transactions from './pages/expenses/Transactions'; // Assuming Transactions is here
import Teams from './pages/teams/Teams';
import Employees from './pages/employees/Employees';

// 4. Reports & Settings
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import Onboarding from './pages/onboarding/Onboarding';

// Stores
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { checkAuth, isInitializing } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ONBOARDING (Special case) */}
      <Route path="/onboarding" element={<Onboarding />} />

      {/* PROTECTED DASHBOARD ROUTES */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/expenses" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* CATCH-ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;