import { queryTrpc } from 'app/trpc';

export const usePackTemplates = (
  searchQuery?: string,
  enabled: boolean = true,
) => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getPackTemplates.useQuery(
      { searchQuery },
      {
        enabled,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    );

  return { data, error, isLoading, refetch };
};
