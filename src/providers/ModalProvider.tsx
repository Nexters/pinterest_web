import { type Dispatch, type PropsWithChildren, createContext, useMemo } from 'react';
import { Action, State, useModals } from '@/components/user/hooks';

type ModalContextType = {
  status: State;
  dispatch: Dispatch<Action>;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
  const { status, dispatch } = useModals();
  const contextValue = useMemo(() => ({ status, dispatch }), [status, dispatch]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}
