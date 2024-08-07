import { queryTrpc } from '../../trpc';

export const useSimilarPacks = (id: string) => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getSimilarPacks.useQuery(
      { id, limit: 10 },
      {
        refetchOnWindowFocus: true,
      },
    );

  return { data, error, isLoading, refetch };
};
