import { queryTrpc } from 'app/trpc';
import { usePagination } from 'app/hooks/common';
import { useOfflineQueue, useOfflineQueueProcessor } from 'app/hooks/offline';

// TODO handle offline requests
export const useItems = (filters) => {
  const { refetch, data, isLoading, isError, error, isFetching } =
    queryTrpc.getItemsGlobally.useQuery(filters, {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
    });

  console.log('useItems', { error });

  useOfflineQueueProcessor();

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
