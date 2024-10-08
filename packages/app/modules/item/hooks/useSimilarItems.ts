import { queryTrpc } from 'app/trpc';

export const useSimilarItems = (id: string, enabled = true) => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getSimilarItems.useQuery(
      { id, limit: 10 },
      {
        enabled,
        refetchOnWindowFocus: true,
      },
    );

  return { data, error, isLoading, refetch };
};
