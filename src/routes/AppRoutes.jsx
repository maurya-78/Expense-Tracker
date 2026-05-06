import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import ExpenseList from '../pages/expenses/ExpenseList';
import TeamList from '../pages/teams/TeamList';
import EmployeeList from '../pages/employees/EmployeeList';
import AdvancedAnalytics from '../pages/analytics/AdvancedAnalytics';
import MonthlyReports from '../pages/reports/MonthlyReports';
import ProfileSettings from '../pages/settings/Profile';

// Guards
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected SaaS Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          {/* General Access Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/profile" element={<ProfileSettings />} />

          {/* Admin/Founder Only Pages */}
          <Route element={<RoleRoute allowedRoles={['founder', 'finance_manager']} />}>
            <Route path="/teams" element={<TeamList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/analytics" element={<AdvancedAnalytics />} />
            <Route path="/reports" element={<MonthlyReports />} />
          </Route>
        </Route>
      </Route>

      {/* Global Fallback */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;