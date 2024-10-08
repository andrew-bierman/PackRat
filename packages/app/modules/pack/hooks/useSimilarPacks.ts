import { queryTrpc } from 'app/trpc';

export const useSimilarPacks = (id: string, enabled: boolean = true) => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getSimilarPacks.useQuery(
      { id, limit: 10 },
      {
        enabled,
        refetchOnWindowFocus: true,
      },
    );

  return { data, error, isLoading, refetch };
};
