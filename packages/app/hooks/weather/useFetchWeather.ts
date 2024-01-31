import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { useState, useEffect } from 'react';

export const useFetchWeather = (latLng) => {
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
