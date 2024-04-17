import { queryTrpc } from '../trpc';

export const usePhotonDetail = (
  searchString = '',
  showSearchResults = false,
) => {
  const { isError, isLoading, data, refetch } =
    queryTrpc.getPhotonResults.useQuery(
      { searchString },
      {
        enabled: showSearchResults,
        refetchOnWindowFocus: false,
      },
    );
  return { isError, data, refetch, isLoading };
};
