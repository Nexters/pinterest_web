import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '@/hooks';

export function Portal({ children }: PropsWithChildren) {
  const elementRef = useRef<HTMLElement | null>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    elementRef.current = document.getElementById('portal-root');
  }, [mounted]);

  if (!elementRef.current) return null;

  return createPortal(children, elementRef.current);
}
