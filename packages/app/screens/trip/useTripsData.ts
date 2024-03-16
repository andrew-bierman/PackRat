// useTripsData.js
import { useState } from 'react';
import { useFetchWeather, useFetchWeatherWeak } from 'app/hooks/weather';
import useParks from 'app/hooks/parks';
import useTrails from 'app/hooks/trails';
import {
  useCurrentDestination,
  useGetPhotonDetails,
} from 'app/hooks/destination';
import { useGEOLocationSearch } from 'app/hooks/geojson';

export const useTripsData = () => {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [osm] = useGEOLocationSearch();
  const { currentDestination, latLng } = useCurrentDestination();
  const { data: photonDetails } = useGetPhotonDetails(
    osm && osm.osmId && osm.osmType
      ? {
          properties: {
            osm_id: osm.osmId,
            osm_type: osm.osmType,
          },
        }
      : {
          properties: {
            osm_id: '',
            osm_type: '',
          },
        },
  );

  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useFetchWeather(latLng);

  const {
    data: weatherWeekData,
    isLoading: weekWeatherLoading,
    isError: weekWeatherError,
  } = useFetchWeatherWeak(latLng);

  const {
    data: parks,
    error: parksError,
    isLoading: parksLoading,
    filteredParks: parksData,
  } = useParks({
    latLng,
  });

  const { data, filteredTrails, error, isLoading } = useTrails({
    latLng,
    selectedSearch: osm.name,
  });

  return {
    dateRange,
    setDateRange,
    osm,
    currentDestination,
    latLng,
    photonDetails,
    weatherData,
    weatherLoading,
    weatherError,
    weatherWeekData,
    weekWeatherLoading,
    weekWeatherError,
    parksData,
    parksError,
    parksLoading,
    filteredTrails,
    trailsError: error,
    trailsLoading: isLoading,
  };
};
