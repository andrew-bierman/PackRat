import { queryTrpc } from 'app/trpc';

export const usePackTemplates = () => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getPackTemplates.useQuery(undefined, {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    });

  return { data, error, isLoading, refetch };
};
