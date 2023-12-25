// src/provider/CombinedProvider.tsx

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import { store, persistor } from '../store/store';
import {SearchProvider} from '../context/searchContext'

// Additional imports from the branch
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

import { queryTrpc, getToken } from '../trpc';
import { httpBatchLink } from '@trpc/client';
import { api } from '~/constants/api';
import { useEffect } from 'react';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  // Setup for React Query and TRPC
  const queryClient = new QueryClient();

  const persister = createAsyncStoragePersister({
    storage: AsyncStorage,
    throttleTime: 3000,
  });

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status = !!state.isConnected;
      onlineManager.setOnline(status);
    });
  }, []);

  const trpcClient = queryTrpc.createClient({
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
  });

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status = !!state.isConnected;
      onlineManager.setOnline(status);
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistQueryClientProvider
        onSuccess={async () =>
          queryClient
            .resumePausedMutations()
            .then(async () => queryClient.invalidateQueries())
        }
        persistOptions={{ persister }}
        client={queryClient}
      >
        <queryTrpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistor}>
              <SessionProvider>
                <ThemeProvider>
                <SearchProvider>
                {children}
                </SearchProvider>
                </ThemeProvider>
              </SessionProvider>
            </PersistGate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </queryTrpc.Provider>
      </PersistQueryClientProvider>
    </ReduxProvider>
  );
}
