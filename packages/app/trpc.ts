import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/routes/trpcRouter';
import { api } from './constants/api';
import { createTRPCReact } from '@trpc/react-query';
import { Storage } from 'app/utils/storage';
import axios from 'app/config/trpcAxiosClient';

export const getToken = async () => {
  const token = await Storage.getItem('token');
  if (!token) return '';
  return token;
};

const axiosFetch = async (url, options) => {
  let axiosResponse;

  try {
    axiosResponse = await axios({
      method: options.method,
      url,
      data: options.body,
      headers: options.headers,
    });
  } catch (e) {
    axiosResponse = e.response;
  } finally {
    return new Response(JSON.stringify(axiosResponse.data), {
      status: axiosResponse.status,
      statusText: axiosResponse.statusText,
      headers: axiosResponse.headers,
    });
  }
};

// export const reactTrpc = createTRPCReact<AppRouter>();
export const queryTrpc = createTRPCReact<AppRouter>();

export const trpc = queryTrpc.createClient({
  links: [
    httpBatchLink({
      url: `${api}/trpc`,
      fetch: axiosFetch,
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
