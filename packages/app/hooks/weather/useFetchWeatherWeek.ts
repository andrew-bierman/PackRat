import { queryTrpc } from '../../trpc';

export const useFetchWeatherWeak = (latLng, isDisabled = false) => {
  const { lat, lon } = latLng || {};
  const isEnabled = !isDisabled && Boolean(lat && lon);
  console.log({ isEnabled, isDisabled, latLng });

  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getWeatherWeek.useQuery(
      { lat, lon },
      {
        enabled: isEnabled,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );

  return { refetch, data: data?.list?.slice(0, 4), error, isLoading, isError };
};
