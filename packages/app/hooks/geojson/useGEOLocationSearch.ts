import { useMemo } from 'react';
import { useSearchParams } from 'app/hooks/common';
import { parseCoordinates } from 'app/utils/coordinatesParser';

export const useGEOLocationSearch = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const osmId = searchParams.get('osmId');
  const osmType = searchParams.get('osmType');

  const setGEOLocation = (geoJSON) => {
    const { lat, lon } = parseCoordinates(geoJSON) || {};
    const newSearchParams = {};

    if (!isNaN(lat) && !isNaN(lon)) {
      newSearchParams.lat = lat;
      newSearchParams.lon = lon;
    }

    if (geoJSON?.properties?.osm_id && geoJSON?.properties?.osm_type) {
      newSearchParams.osmId = geoJSON.properties.osm_id;
      searchParams.osmType = geoJSON.properties.osm_type;
    }

    searchParams.reset(newSearchParams);
  };

  const latLng = useMemo(() => {
    return { lat: +lat, lon: +lon };
  }, [lat, lon, osmType, osmId]);

  const osm = useMemo(() => {
    return { osmType, osmId };
  }, [osmType, osmId]);

  return [{ latLng, osm }, setGEOLocation];
};
