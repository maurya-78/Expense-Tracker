import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AuthGuard from './AuthGuard';
import PublicRoute from './PublicRoute';

// Lazy Loading Pages for Performance
const Login = lazy(() => import('../pages/auth/LoginPage'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const ExpenseList = lazy(() => import('../pages/expenses/ExpenseList'));
const AddExpense = lazy(() => import('../pages/expenses/AddExpense'));
const ExpenseDetails = lazy(() => import('../pages/expenses/ExpenseDetails'));

const TeamList = lazy(() => import('../pages/teams/TeamList'));
const TeamDetails = lazy(() => import('../pages/teams/TeamDetails'));
const CreateTeam = lazy(() => import('../pages/teams/CreateTeam'));

const EmployeeList = lazy(() => import('../pages/employees/EmployeeList'));
const AddEmployee = lazy(() => import('../pages/employees/AddEmployee'));
const EmployeeProfile = lazy(() => import('../pages/employees/EmployeeProfile'));

const ReportIndex = lazy(() => import('../pages/reports/ReportIndex'));
const MonthlyReports = lazy(() => import('../pages/reports/MonthlyReports'));

const FinancialAnalytics = lazy(() => import('../pages/analytics/FinancialAnalytics'));
const AdvanceAnalytics = lazy(() => import('../pages/analytics/AdvanceAnalytics'));

const Settings = lazy(() => import('../pages/settings/Settings'));
const Onboarding = lazy(() => import('../pages/onboarding/OnboardingFlow'));

// Loading Fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background">
    <Loader2 className="animate-spin text-primary" size={32} />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        {/* Onboarding (Protected) */}
        <Route path="/onboarding" element={<AuthGuard><Onboarding /></AuthGuard>} />

        {/* Dashboard Layout (Protected) */}
        <Route path="/" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
          <Route index element={<Dashboard />} />
          
          {/* Expense Module */}
          <Route path="expenses">
            <Route index element={<ExpenseList />} />
            <Route path="add" element={<AddExpense />} />
            <Route path=":id" element={<ExpenseDetails />} />
            <Route path="edit/:id" element={<AddExpense />} />
          </Route>

          {/* Team Module */}
          <Route path="teams">
            <Route index element={<TeamList />} />
            <Route path="create" element={<CreateTeam />} />
            <Route path=":id" element={<TeamDetails />} />
          </Route>

          {/* Employee Module */}
          <Route path="employees">
            <Route index element={<EmployeeList />} />
            <Route path="add" element={<AddEmployee />} />
            <Route path=":id" element={<EmployeeProfile />} />
          </Route>

          {/* Analytics & Reports */}
          <Route path="analytics">
            <Route index element={<FinancialAnalytics />} />
            <Route path="advanced" element={<AdvanceAnalytics />} />
          </Route>
          
          <Route path="reports">
            <Route index element={<ReportIndex />} />
            <Route path="monthly" element={<MonthlyReports />} />
          </Route>

          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;