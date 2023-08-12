import { useEffect, useState } from 'react';

export function useLogin() {
  const [login, setLogin] = useState(false);
  
  useEffect(() => {
    const user_id = localStorage.getItem('userId');
    if (user_id) {
      setLogin(true);
    }
  }, []);

  return { login };
}
