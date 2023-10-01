import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/routes/trpcRouter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './constants/api';
import { createTRPCReact } from '@trpc/react-query';
console.log('api', api);



export const getToken = async (key: string) => {
  const token = await AsyncStorage.getItem(key);
  if (!token) return '';
  return token;
};

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${api}/trpc`,
      async headers() {
        const token = await getToken('session');
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
