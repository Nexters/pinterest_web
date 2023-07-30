import { useState } from 'react';

export function useDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return { isDrawerOpen, openDrawer, closeDrawer } as const;
}
