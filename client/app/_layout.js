import { Slot } from 'expo-router';
import { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navigation from '../screens/Navigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store/store';

import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import FlashMessage from 'react-native-flash-message';
import Footer from '../components/footer/Footer';

import { queryTrpc, getToken } from '../trpc';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '~/constants/api';

import { TrpcQueryProvider } from '../context/tRPC';

// Move this to its own context
import { onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeLayout() {
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
    <Provider store={store}>
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
                  <FlashMessage position="top" />
                  <Navigation />
                  <Slot />
                  {/* {Platform.OS === 'web' ? <Footer /> : null} */}
                </ThemeProvider>
              </SessionProvider>
            </PersistGate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </queryTrpc.Provider>
      </PersistQueryClientProvider>
    </Provider>
  );
}
