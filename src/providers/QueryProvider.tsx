import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import type { QueryClientConfig } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  queryOptions?: QueryClientConfig;
}

export function QueryProvider({ children, queryOptions }: PropsWithChildren<Props>) {
  const [queryClient] = useState(() => new QueryClient(queryOptions));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
