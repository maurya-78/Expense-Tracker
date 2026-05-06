import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, logout: storeLogout } = useAuthStore();

  const logout = () => {
    storeLogout();
    navigate('/login');
  };

  const hasRole = (roles) => {
    return roles.includes(user?.role);
  };

  return {
    user,
    logout,
    hasRole,
    isAuthenticated: !!user
  };
};