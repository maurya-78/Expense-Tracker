import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useNotifications } from './useNotifications';

/**
 * Custom hook for managing authentication state and actions.
 * Integrates with Zustand store and React Router.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifySuccess, notifyError } = useNotifications();
  
  // Destructure from Zustand store
  const { user, token, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  /**
   * Handles user login and session initialization
   */
  const login = useCallback(async (credentials) => {
    setIsAuthenticating(true);
    try {
      // Simulate API call to /api/auth/login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = { 
        id: 'user_01', 
        name: 'Sharma Admin', 
        email: credentials.email, 
        role: 'Admin',
        company: 'Sharma Paint House'
      };
      const mockToken = 'eyJhYmMiOiIxMjMifQ'; // Simulated JWT

      // Update Global State & Persist
      setAuth(mockUser, mockToken);
      localStorage.setItem('token', mockToken);

      notifySuccess('Login successful. Welcome back!');

      // Redirect to intended page or dashboard
      const origin = location.state?.from?.pathname || '/';
      navigate(origin, { replace: true });
    } catch (err) {
      notifyError('Invalid credentials. Please try again.');
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  }, [navigate, location, setAuth, notifySuccess, notifyError]);

  /**
   * Handles user logout and clean up
   */
  const logout = useCallback(() => {
    storeLogout();
    localStorage.removeItem('token');
    notifySuccess('Logged out successfully.');
    navigate('/login', { replace: true });
  }, [storeLogout, navigate, notifySuccess]);

  /**
   * Helper to verify if the user has a specific role
   */
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  return {
    user,
    token,
    isAuthenticated,
    isAuthenticating,
    login,
    logout,
    hasRole,
    isAdmin: user?.role === 'Admin'
  };
};