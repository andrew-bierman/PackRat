import { queryTrpc } from 'app/trpc';
import { usePagination } from 'app/hooks/common';
import { useOfflineQueue, useOfflineQueueProcessor } from 'app/hooks/offline';

// TODO handle offline requests
export const useItems = () => {
  const { limit, page, handleLimitChange, handlePageChange } = usePagination();
  const { refetch, data, isLoading, isError, isFetching } =
    queryTrpc.getItemsGlobally.useQuery(
      { limit, page, searchString: '' },
      {
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    );
  useOfflineQueueProcessor();

  return {
    data,
    isLoading,
    isError,
    limit,
    isFetching,
    handleLimitChange,
    page,
    handlePageChange,
    refetch,
  };
};
