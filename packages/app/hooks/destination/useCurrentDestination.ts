import { useMemo } from 'react';
import { useGEOLocationSearch } from 'app/hooks/geojson';
import { usePhotonDetail } from '../photonDetail';
import { parseCoordinates } from 'app/utils/coordinatesParser';

export const useDestination = (osm: any) => {
  const { data, isError, isLoading } = usePhotonDetail(osm.name, true);
  const currentDestination = useMemo(() => {
    return data?.find((destination) => {
      return (
        destination.properties.osm_type === osm.osmType &&
        `${destination.properties.osm_id}` === `${osm.osmId}` &&
        destination.geometry?.type === 'Point'
      );
    });
  }, [osm.osmId, osm.osmType, data]);

  const latLng = useMemo(() => {
    if (!currentDestination) return null;

    return parseCoordinates(currentDestination);
  }, [currentDestination]);

  return { currentDestination, latLng, isError, isLoading };
};

export const useCurrentDestination = () => {
  const [osm] = useGEOLocationSearch();

  return useDestination(osm);
};
