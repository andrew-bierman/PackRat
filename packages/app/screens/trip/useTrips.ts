import { useState, useRef } from 'react';
import {
  useCurrentDestination,
  useGetPhotonDetails,
} from 'app/hooks/destination';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import { useCardTrip } from 'app/hooks/trips/useTripCard';
import { useFetchWeather, useFetchWeatherWeak } from 'app/hooks/weather';
import useParks from 'app/hooks/parks';

export const useTrips = () => {
  const [trails, setTrailsData] = useState();
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [osm] = useGEOLocationSearch();
  const form = useCardTrip();
  const placesAutoCompleteRef = useRef({});
  const { currentDestination, latLng } = useCurrentDestination();
  const { data: photonDetails } = useGetPhotonDetails({
    properties: {
      osm_id: osm?.osmId,
      osm_type: osm?.osmType,
    },
  });

  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useFetchWeather(latLng);

  const {
    data: parks,
    error: parksError,
    isLoading: parksLoading,
    filteredParks: parksData,
  } = useParks({
    latLng,
  });

  const {
    data: weatherWeekData,
    isLoading: weekWeatherLoading,
    isError: weekWeatherError,
  } = useFetchWeatherWeak(latLng);

  return {
    trails,
    setTrailsData,
    dateRange,
    setDateRange,
    osm,
    form,
    placesAutoCompleteRef,
    currentDestination,
    latLng,
    photonDetails,
    weatherData,
    weatherLoading,
    weatherError,
    weatherWeekData,
    weekWeatherLoading,
    weekWeatherError,
    parks,
    parksError,
    parksLoading,
    parksData,
  };
};
