import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// import type { AppRouter } from 'server/src/routes/trpcRouter';
import { useState } from 'react';
import * as React from 'react';
import { createTRPCReact } from '@trpc/react-query';
import { api } from '../../constants/api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { trpc } from '../../trpc';

// const getUser = async (key) => {
//   const user = await AsyncStorage.getItem(key);
//   if (!user) return '';
//   return JSON.parse(user);
// };

// export const trpc =
//   createTRPCProxyClient <
//   AppRouter >
//   {
//     links: [
//       httpBatchLink({
//         url: `${api}/trpc`,
//         // async headers() {
//         //   const { token } = await getUser('session');
//         //   return {
//         //     authorization: token ? `Bearer ${token}` : '',
//         //   };
//         // },
//       }),
//     ],
//     transformer: undefined,
//   };

export const trpc = createTRPCReact();

// console.log('trpc.Provider', trpc.Provider)

export function TrpcQueryProvider({ children }) {
  // return children

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCProxyClient({
      links: [
        httpBatchLink({
          url: `${api}/trpc`,
        }),
      ],
      transformer: undefined,
    }),
  );

  // const trpcClient = createTRPCProxyClient({
  //   links: [
  //     httpBatchLink({
  //       url: `${api}/trpc`,
  //     }),
  //   ],
  //   transformer: undefined,
  // })

  // console.log('trpcClient', trpcClient)

  // return (
  //     <QueryClientProvider client={queryClient}>
  //       {children}
  //     </QueryClientProvider>
  // )

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
