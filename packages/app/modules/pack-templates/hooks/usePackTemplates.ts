import { queryTrpc } from 'app/trpc';

export const usePackTemplates = (enabled: boolean = true) => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getPackTemplates.useQuery(undefined, {
      enabled,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    });

  return { data, error, isLoading, refetch };
};
