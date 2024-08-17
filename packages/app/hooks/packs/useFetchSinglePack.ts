import { useAuthUser } from 'app/modules/auth';
import { queryTrpc } from '../../trpc';

export const useFetchSinglePack = (packId) => {
  const user = useAuthUser();
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getPackById.useQuery(
      { packId },
      {
        enabled: !!packId, // to ensure the query runs only when packId is available
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    );
  const isOwner = data && user && data.owner_id === user.id;

  return { refetch, data, error, isLoading, isOwner, isError };
};
