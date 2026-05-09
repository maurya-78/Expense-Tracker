import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { ShieldAlert } from 'lucide-react';

/**
 * Restricts access based on user roles (e.g., Admin only for Settings).
 * @param {string[]} allowedRoles - Array of roles allowed to access the route.
 */
const RoleRoutes = ({ allowedRoles }) => {
  const { user } = useAuthStore();

  // Check if user role matches allowed roles for this route
  const hasAccess = allowedRoles.includes(user?.role);

  if (!hasAccess) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-black tracking-tight">Access Restricted</h2>
        <p className="text-muted-foreground text-sm max-w-xs mt-2">
          Your account role ({user?.role}) does not have permission to view this financial module.
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default RoleRoutes;