import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader2 } from 'lucide-react';

const SessionPersistence = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const checkSession = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // In a real app, you would validate the token with the backend here
          setAuth(JSON.parse(storedUser), storedToken);
        } catch (e) {
          console.error("Session restoration failed", e);
          localStorage.clear();
        }
      }
      setIsInitializing(false);
    };

    checkSession();
  }, [setAuth]);

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">$</span>
        </div>
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  return children;
};

export default SessionPersistence;