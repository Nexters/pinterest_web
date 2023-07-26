import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import type { QueryClientConfig } from '@tanstack/react-query';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  queryOptions?: QueryClientConfig;
}

export function QueryProvider({ children, queryOptions }: PropsWithChildren<Props>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.error(query.meta?.errorMessage);
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: false,
            suspense: true,
          },
          mutations: {
            useErrorBoundary: true,
          },
          ...queryOptions?.defaultOptions,
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
