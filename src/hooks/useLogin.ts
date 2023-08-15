import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useLogin() {
  const [login, setLogin] = useState<boolean | null>(null);

  useIsomorphicLayoutEffect(() => {
    const user_id = localStorage.getItem('userId');
    if (user_id) {
      setLogin(true);
      return;
    }
    setLogin(false);
  }, []);

  return { login };
}
