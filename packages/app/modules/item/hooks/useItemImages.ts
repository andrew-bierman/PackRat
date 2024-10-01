import { queryTrpc } from 'app/trpc';

export const useItemImages = (itemId?: string) => {
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getItemImages.useQuery(
      { id: itemId },
      {
        enabled: !!itemId,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    );

  return { refetch, data, error, isLoading, isError };
};