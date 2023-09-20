import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/routes/trpcRouter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './constants/api';

console.log('api', api);

const getUser = async (key) => {
  const user = await AsyncStorage.getItem(key)
  if (!user) return
  return JSON.parse(user)
}

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${api}/trpc`,
      async headers() {
        const { token } = await getUser('session')
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
  transformer: undefined,
});
