import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/routes/trpcRouter';
import { useState } from 'react';
import * as React from 'react';
import { createTRPCReact } from '@trpc/react-query';
import { api } from 'app/constants/api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const trpc = createTRPCReact<AppRouter>();

export function TrpcQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${api}/trpc`,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </React.Suspense>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
