import { queryTrpc } from 'app/trpc';

export const useGetUser = (userId: string) => {
  // If userId is not provided, don’t run the query.
  const enabled = !!userId;

  // Leverage the query hook provided by tRPC
  const { data, error, isLoading, refetch } = queryTrpc.getUserById.useQuery(
    { userId },
    {
      enabled, // This query will run only if 'enabled' is true.
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  return { data, error, isLoading, refetch };
};
