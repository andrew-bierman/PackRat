import { queryTrpc } from '../../trpc';

export const useFetchUserFavorites = (userId) => {
  const enabled = !!userId;

  const { data, error, isLoading, refetch } =
    queryTrpc.getUserFavorites.useQuery(
      { userId },
      {
        enabled,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );

  return { data, error, isLoading, refetch };
};
