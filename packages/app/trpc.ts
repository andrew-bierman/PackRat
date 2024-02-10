import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/routes/trpcRouter';
import { api } from './constants/api';
import { createTRPCReact } from '@trpc/react-query';
import { Storage } from 'app/utils/storage';

export const getToken = async () => {
  const token = await Storage.getItem('token');
  if (!token) return '';
  return token;
};

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${api}/trpc`,
      async headers() {
        const token = await getToken();
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
  transformer: undefined,
});

// export const reactTrpc = createTRPCReact<AppRouter>();
export const queryTrpc = createTRPCReact<AppRouter>();

// import { trpc } from './context/tRPC';
// export { trpc }
