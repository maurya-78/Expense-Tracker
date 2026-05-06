import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // If not authenticated, redirect to login but save the current location 
  // so we can redirect them back after they log in.
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;