// src/provider/CombinedProvider.tsx

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import { store, persistor } from '../store/store';
import { useState, useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NetworkStatusProvider } from '../context/NetworkStatusProvider';
import { queryTrpc, getToken } from '../trpc';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '~/constants/api';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
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
          <QueryClientProvider client={queryClient}></QueryClientProvider>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </SessionProvider>
          </PersistGate>
        </queryTrpc.Provider>
      </PersistQueryClientProvider>
    </ReduxProvider>
  );
}
