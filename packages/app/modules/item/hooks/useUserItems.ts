import { queryTrpc } from 'app/trpc';
import { useOfflineQueueProcessor } from 'app/hooks/offline';
import { useAuthUser } from 'app/modules/auth';

// TODO handle offline requests
export const useUserItems = (filters) => {
  const authUser = useAuthUser();
  const { refetch, data, isLoading, isError, isFetching } =
    queryTrpc.getUserItems.useQuery(
      { ...filters, ownerId: authUser.id },
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
    isFetching,
    refetch,
  };
};
