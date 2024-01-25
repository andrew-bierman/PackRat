import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';

export const useFetchSinglePack = (packId) => {
  const user = store.getState().auth.user;
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
