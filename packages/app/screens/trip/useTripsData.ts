// useTripsData.js
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
    isFetching: isPhotonLoading,
  } = useGetPhotonDetails(
    {
      properties: {
        osm_id: osm?.osmId ?? '',
        osm_type: osm?.osmType ?? '',
      },
    },
    false,
  );

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
    parksData,
    parksError,
    parksLoading,
    filteredTrails,
    trailsError: error,
    trailsLoading: isLoading,
  };
};
