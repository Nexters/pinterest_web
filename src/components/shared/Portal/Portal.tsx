import type { PropsWithChildren } from 'react';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '@/hooks';

export function Portal({ children }: PropsWithChildren) {
  const elementRef = useRef<HTMLElement | null>(null);
  const mounted = useMounted();

  if (!mounted) return null;

  elementRef.current = document.getElementById('portal-root');
  if (!elementRef.current) return null;

  return createPortal(children as any, elementRef.current);
}
