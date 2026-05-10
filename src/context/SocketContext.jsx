import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_API_URL, {
        query: { userId: user.id },
      });
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);