import { queryTrpc } from 'app/trpc';

export const useGetPackTemplate = (id: string) => {
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getPackTemplate.useQuery(id, {
      refetchOnWindowFocus: true,
      staleTime: Infinity,
      cacheTime: Infinity,
    });

  return { refetch, data, error, isLoading, isError };
};
