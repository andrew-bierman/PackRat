import { useMemo } from 'react';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import { usePhotonDetail } from '../photonDetail';
import { parseCoordinates } from 'app/utils/coordinatesParser';

export const useCurrentDestination = () => {
  const [osm] = useGEOLocationSearch();
  const { data, isError, isLoading } = usePhotonDetail(osm.name, true);
  const currentDestination = useMemo(() => {
    return data?.find((destination) => {
      return (
        destination?.properties.osm_type === osm.osmType &&
        destination?.properties.osm_id.toString() === osm.osmId &&
        destination?.geometry?.type === 'Point'
      );
    });
  }, [osm.osmId, osm.osmType, data]);
  const latLng = useMemo(() => {
    if (!currentDestination) return {};

    return parseCoordinates(currentDestination);
  }, [currentDestination]);
  return { currentDestination, latLng, isError, isLoading };
};
