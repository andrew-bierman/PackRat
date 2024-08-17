import { queryTrpc } from '../../trpc';

export const useSimilarItems = (id: string) => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getSimilarItems.useQuery(
      { id, limit: 10 },
      {
        refetchOnWindowFocus: true,
      },
    );

  return { data, error, isLoading, refetch };
};
