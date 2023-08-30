import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/routes/trpcRouter';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
  transformer: undefined,
});
