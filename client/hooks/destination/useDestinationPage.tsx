import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'expo-router';
import useTheme from '~/hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import MapContainer from '~/components/map/MapContainer.web';
import { defaultShape } from '~/utils/mapFunctions';
import { useGetDestination, useGetPhotonDetails } from '~/hooks/destination';

const useDestinationPage = () => {
  // console.log('destination page');
  const router = useRouter();
  const { destinationId, id, type, lat, lon } = useSearchParams();
  const [destination_id, setDestinationId] = useState(destinationId);
  const [properties, setProperties] = useState({ osm_id: id, osm_type: type });

  const dispatch = useDispatch();

  const matchPhotonFormattingForData = { properties };
  const { isLoading, isError, data } = useGetPhotonDetails(
    matchPhotonFormattingForData,
  );
  useGetDestination({ destinationId: destination_id, properties });

  // const photonDetailsStore = useSelector(
  //   (state) => state.destination.photonDetails,
  // );

  const currentDestination = {
    geoJSON: data,
  };

  const geoJSON = currentDestination?.geoJSON;
  const selectedSearchResult = useSelector(
    (state) => state.destination.selectedSearchResult,
  );

  useEffect(() => {
    setDestinationId(destinationId);
    if (destinationId) {
      setProperties({ osm_id: id, osm_type: type });
    }
  }, [destinationId]);

  if (!currentDestination) {
    return null;
  }

  const shape = geoJSON ?? defaultShape;

  const map = () => <MapContainer shape={shape} />;

  return {
    destinationId,
    id,
    type,
    lat,
    lon,
    destination_id,
    setDestinationId,
    properties,
    setProperties,
    dispatch,
    matchPhotonFormattingForData,
    isLoading,
    isError,
    data,
    currentDestination,
    geoJSON,
    selectedSearchResult,
    shape,
    map,
  };
};

export { useDestinationPage };
