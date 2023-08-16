import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useStoredUserId() {
  const [storedUserId, setStoredUserId] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setStoredUserId(id);
      return;
    }
  }, []);

  return { storedUserId };
}
