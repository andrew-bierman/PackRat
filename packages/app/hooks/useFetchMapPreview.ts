import { queryTrpc } from '../trpc';

export const useFetchMapPreview = (mapPreviewUri) => {
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getMapPreview.useQuery(mapPreviewUri, {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });

  const image = `data:image/png;base64, ${data}`;

  return { refetch, image, error, isLoading, isError };
};
