import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  return (
    <LayoutContext.Provider value={{ 
      isCommandPaletteOpen, 
      setCommandPaletteOpen,
      activeSidebarItem,
      setActiveSidebarItem
    }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);