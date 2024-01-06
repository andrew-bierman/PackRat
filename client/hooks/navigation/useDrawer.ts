import { useState } from 'react';

export const useDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const closeDrower = () => setIsDrawerOpen(false);

  return { isDrawerOpen, toggleDrawer, closeDrower };
};
