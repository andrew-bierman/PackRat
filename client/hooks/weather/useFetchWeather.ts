import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { useState, useEffect } from 'react';
import { parseCoordinates } from '~/utils/coordinatesParser';

export const useFetchWeather = (geoJSON) => {
  const [latLng, setLatLng] = useState({ lat: null, lon: null });
  useEffect(() => {
    /**
     * @return {Promise<void>} - A Promise that resolves when the weather data is fetched and stored.
     */
    setLatLng(parseCoordinates(geoJSON));
  }, [geoJSON]);
  const { lat, lon } = latLng;
  const isEnabled = Boolean(lat && lon);
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
