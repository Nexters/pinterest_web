import { useCallback, useState } from 'react';

export function useToggle(initState = false) {
  const [status, setStatus] = useState(initState);

  const setOn = useCallback(() => {
    setStatus(true);
  }, []);

  const setOff = useCallback(() => {
    setStatus(false);
  }, []);

  const toggle = useCallback(() => {
    setStatus((prev) => !prev);
  }, []);

  return { status, toggle, setOn, setOff } as const;
}
