import type { ComponentProps, PropsWithChildren } from 'react';
import { Hydrate as QueryHydrate } from '@tanstack/react-query';

type Props = ComponentProps<typeof QueryHydrate>;

export function Hydrate({ children, ...restProps }: PropsWithChildren<Props>) {
  return <QueryHydrate {...restProps}>{children}</QueryHydrate>;
}
