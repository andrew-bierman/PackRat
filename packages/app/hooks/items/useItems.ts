import { queryTrpc } from 'app/trpc';
import { usePagination } from 'app/hooks/common';
import { useOfflineQueue, useOfflineQueueProcessor } from 'app/hooks/offline';

// TODO handle offline requests
export const useItems = (filters) => {
  const { refetch, data, isLoading, isError, isFetching } =
    queryTrpc.getItemsGlobally.useQuery(filters, {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
    });
  useOfflineQueueProcessor();

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
