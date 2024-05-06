import { queryTrpc } from '../../trpc';

export const useFetchWeather = (latLng, isDisabled = false) => {
  const { lat, lon } = latLng || {};
  const isEnabled = !isDisabled && Boolean(lat && lon);
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getWeather.useQuery(
      { lat, lon },
      {
        enabled: isEnabled,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );
  return { refetch, data, error, isLoading, isError };
};
