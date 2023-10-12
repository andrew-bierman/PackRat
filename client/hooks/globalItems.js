import { queryTrpc } from '../trpc';

export const useFetchGlobalItems = (limit, page) => {
  const { isLoading, isError, data, refetch } =
    queryTrpc.getItemsGlobally.useQuery({
      limit: Number(limit),
      page: Number(page),
    });
  return { isLoading, isError, data, refetch };
};
