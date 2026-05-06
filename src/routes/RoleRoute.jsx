import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuthStore();

  // Check if the user's role is in the list of allowed roles for this route
  const hasAccess = user && allowedRoles.includes(user.role);

  return hasAccess ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace /> // Or a dedicated 403 Unauthorized page
  );
};

export default RoleRoute;