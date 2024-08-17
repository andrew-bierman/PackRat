import { useAuthUser } from 'app/modules/auth';
import { queryTrpc } from '../../trpc';

export const useItem = (itemId?: string) => {
  const user = useAuthUser();
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getItemById.useQuery(
      { id: itemId },
      {
        enabled: !!itemId, // to ensure the query runs only when packId is available
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    );
  const isOwner = data && user && data.ownerId === user.id;

  return { refetch, data, error, isLoading, isOwner, isError };
};
