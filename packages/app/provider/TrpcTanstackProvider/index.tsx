import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { queryTrpc, trpc } from '../../trpc';
import { api } from 'app/constants/api';
import { Platform } from 'react-native';

export const TrpcTanstackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = React.useState(() => new QueryClient());

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

  return (
    <PersistQueryClientProvider
      onSuccess={async () =>
        queryClient
          .resumePausedMutations()
          .then(async () => queryClient.invalidateQueries())
      }
      persistOptions={{ persister }}
      client={queryClient}
    >
      <queryTrpc.Provider client={trpc} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
          {Platform.OS === 'web' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </queryTrpc.Provider>
    </PersistQueryClientProvider>
  );
};
