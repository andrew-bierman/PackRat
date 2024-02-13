import { useMemo } from 'react';
import { useSearchParams } from 'app/hooks/common';
import { parseCoordinates } from 'app/utils/coordinatesParser';

interface GeoSearchParams {
  osmId?: string;
  osmType?: string;
  name?: string;
}

export const useGEOLocationSearch = (): [
  GeoSearchParams,
  (geoJSON: any) => void,
] => {
  const searchParams = useSearchParams();
  const osmId = searchParams.get('osmId');
  const osmType = searchParams.get('osmType');
  const name = searchParams.get('name');

  const setGEOLocation = (geoJSON) => {
    const newSearchParams: GeoSearchParams = {};

    if (geoJSON?.properties?.osm_id && geoJSON.properties.osm_type && geoJSON.properties.name) {
      newSearchParams.osmId = geoJSON.properties.osm_id;
      newSearchParams.osmType = geoJSON.properties.osm_type;
      newSearchParams.name = geoJSON.properties.name;
    }

    searchParams.reset(newSearchParams);
  };

  const osm = useMemo(() => {
    return { osmType, osmId, name };
  }, [osmType, osmId, name]);

  return [osm, setGEOLocation];
};
