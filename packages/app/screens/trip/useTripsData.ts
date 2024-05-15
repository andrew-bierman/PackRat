// useTripsData.js
import { useFetchWeather, useFetchWeatherWeak } from 'app/hooks/weather';
import useParks from 'app/hooks/parks';
import useTrails from 'app/hooks/trails';
import {
  useCurrentDestination,
  useGetPhotonDetails,
} from 'app/hooks/destination';
import { useGEOLocationSearch } from 'app/hooks/geojson';

export const useTripsData = () => {
  const [osm] = useGEOLocationSearch();
  const { currentDestination, latLng } = useCurrentDestination();
  const {
    data: photonDetails,
    isError: hasPhotonError,
    isLoading: isPhotonLoading,
  } = useGetPhotonDetails({
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
    data: weatherWeekData,
    isLoading: weekWeatherLoading,
    isError: weekWeatherError,
  } = useFetchWeatherWeak(latLng);

  const {
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
    osm,
    currentDestination,
    latLng,
    photonDetails,
    hasPhotonError,
    isPhotonLoading,
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
