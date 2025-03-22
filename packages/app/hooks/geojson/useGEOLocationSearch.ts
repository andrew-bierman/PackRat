import { useMemo, useState } from 'react';
import { createParam } from '@packrat/crosspath';

interface GeoSearchParams {
  osmId?: number;
  osmType?: string;
  name?: string;
}

const { useParams } = createParam<GeoSearchParams>();

export const useGEOLocationSearch = (): [
  GeoSearchParams,
  (geoJSON: any) => void,
] => {
  const { params: osm, setParams } = useParams('osmId');

  const setGEOLocation = (geoJSON) => {
    const newSearchParams: GeoSearchParams = {};

    if (
      geoJSON?.properties?.osm_id &&
      geoJSON.properties.osm_type &&
      geoJSON.properties.name
    ) {
      newSearchParams.osmId = geoJSON.properties.osm_id;
      newSearchParams.osmType = geoJSON.properties.osm_type;
      newSearchParams.name = geoJSON.properties.name;
    }

    setParams(newSearchParams);
  };

  const formattedOSM = useMemo<GeoSearchParams>(
    () => ({
      ...osm,
      osmId: Number(osm.osmId),
    }),
    [osm],
  );

  return [formattedOSM, setGEOLocation];
};

export const useOSM = (): [GeoSearchParams, (geoJSON: any) => void] => {
  const [geoLocation, setGeoLocation] = useState<GeoSearchParams>({});

  const setGEOLocation = (geoJSON) => {
    const newSearchParams: GeoSearchParams = {};

    if (
      geoJSON?.properties?.osm_id &&
      geoJSON.properties.osm_type &&
      geoJSON.properties.name
    ) {
      newSearchParams.osmId = geoJSON.properties.osm_id;
      newSearchParams.osmType = geoJSON.properties.osm_type;
      newSearchParams.name = geoJSON.properties.name;
    }

    setGeoLocation(newSearchParams);
  };

  return [geoLocation, setGEOLocation];
};
