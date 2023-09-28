import { Slot } from 'expo-router';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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

export default function HomeLayout() {
  const queryClient = new QueryClient()
  
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
  })

  return (
      <Provider store={store}>
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
        </Provider>
  );
}
