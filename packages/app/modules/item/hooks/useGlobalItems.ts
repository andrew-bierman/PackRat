import { queryTrpc } from 'app/trpc';
import { useOfflineQueueProcessor } from 'app/hooks/offline';

// TODO handle offline requests
export const useGlobalItems = (filters) => {
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
