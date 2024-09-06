import { queryTrpc } from 'app/trpc';

export const useFetchUserFavorites = (userId: string) => {
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

  return { data, error, isLoading, enabled, refetch };
};
