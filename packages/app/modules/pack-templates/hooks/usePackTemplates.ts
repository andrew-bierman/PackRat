import { queryTrpc } from 'app/trpc';

export const usePackTemplates = (params?: object, enabled: boolean = true) => {
  const { data, error, isLoading, refetch } =
    queryTrpc.getPackTemplates.useQuery(params, {
      enabled,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    });

  return { data, error, isLoading, refetch };
};
