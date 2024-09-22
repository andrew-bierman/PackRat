import React, { useCallback, useEffect, useRef, type FC } from 'react';
import MapContainer, { Source, Layer } from 'react-map-gl';
import { MAPBOX_ACCESS_TOKEN } from '@packrat/config';
import MapLib, { type Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { type MapViewProps } from './model';
import { getBoundingBoxFromShape } from '../utils';

MapLib.accessToken = MAPBOX_ACCESS_TOKEN;
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        [0, '#3288bd'],
        [1, '#66c2a5'],
        [2, '#abdda4'],
        [3, '#e6f598'],
        [4, '#ffffbf'],
        [5, '#fee08b'],
        [6, '#fdae61'],
        [7, '#f46d43'],
        [8, '#d53e4f'],
      ],
    },
    'fill-opacity': 0.3,
  },
};
export const MapView: FC<MapViewProps> = ({
  shape,
  mapStyle,
  onVisibleBoundsChange,
  initialBounds,
}) => {
  const mapRef = useRef<Map>(null);

  const updateVisibleBounds = useCallback(() => {
    if (mapRef.current) {
      onVisibleBoundsChange(mapRef.current.getBounds().toArray());
    }
  }, [onVisibleBoundsChange]);

  const onMoveEnd = useCallback(updateVisibleBounds, [updateVisibleBounds]);
  const onZoomEnd = useCallback(updateVisibleBounds, [updateVisibleBounds]);

  useMapListeners(mapRef.current, onMoveEnd, onZoomEnd);

  const onMapLoad = () => {
    if (mapRef.current && shape) {
      const map = mapRef.current;

      const bbox = initialBounds || getBoundingBoxFromShape(shape);

      map.fitBounds(bbox, { padding: 20 });
    }
  };

  return (
    <MapContainer onLoad={onMapLoad} ref={mapRef} mapStyle={mapStyle}>
      <Source type="geojson" data={shape}>
        <Layer {...dataLayer} />
      </Source>
    </MapContainer>
  );
};

export const useMapListeners = (
  map: Map | null,
  onMoveEnd: () => void,
  onZoomEnd: () => void,
) => {
  useEffect(() => {
    if (!map) return;

    map.on('moveend', onMoveEnd);
    map.on('zoomend', onZoomEnd);

    // Cleanup event listeners on unmount
    return () => {
      map.off('moveend', onMoveEnd);
      map.off('zoomend', onZoomEnd);
    };
  }, [map, onMoveEnd, onZoomEnd]);
};
