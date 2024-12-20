import { useDestination, useGetPhotonDetails } from 'app/hooks/destination';
import { useTripOSM } from './useTripOSM';

export const useTripsData = () => {
  const [osm] = useTripOSM();
  const { currentDestination, latLng } = useDestination(osm);
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

  // TODO: Uncomment this once we have parks and trails data
  // const {
  //   error: parksError,
  //   isLoading: parksLoading,
  //   filteredParks: parksData,
  // } = useParks({
  //   latLng,
  // });

  // const { data, filteredTrails, error, isLoading } = useTrails({
  //   latLng,
  //   selectedSearch: osm.name,
  // });

  return {
    osm,
    currentDestination,
    latLng,
    photonDetails,
    hasPhotonError,
    isPhotonLoading,
  };
};
