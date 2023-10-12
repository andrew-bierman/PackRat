import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';

export const useFetchWeatherWeak = (latLng) => {
  const { lat, lon } = latLng;
  const isEnabled = Boolean(lat && lon);
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
