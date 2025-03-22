import React, { useCallback, useRef, type FC } from 'react';
import MapContainer, { Source, Layer } from 'react-map-gl';
import { MAPBOX_ACCESS_TOKEN } from '@packrat/config';
import MapLib, { type Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { type MapViewProps } from './model';
import { getBoundingBoxFromShape } from '../utils';

MapLib.accessToken = MAPBOX_ACCESS_TOKEN;
export const dataLayer = {
  id: 'data',
  type: 'fill' as 'fill',
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
  shapeURI,
  mapStyle,
  onVisibleBoundsChange,
  initialBounds,
  isInteractive = true,
}) => {
  const mapRef = useRef<Map | null>(null);

  const updateVisibleBounds = useCallback(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds()?.toArray();
      if (bounds) onVisibleBoundsChange(bounds);
    }
  }, [onVisibleBoundsChange]);

  const onMoveEnd = useCallback(updateVisibleBounds, [updateVisibleBounds]);
  const onZoomEnd = useCallback(updateVisibleBounds, [updateVisibleBounds]);

  const attachListeners = useMapListeners(onMoveEnd, onZoomEnd);

  const onMapLoad = () => {
    if (mapRef.current && (shape || initialBounds)) {
      const map = mapRef.current;
      attachListeners(map);

      const bbox = initialBounds || getBoundingBoxFromShape(shape);

      map.fitBounds(bbox, { padding: 20 });
    }
  };

  return (
    <MapContainer
      onLoad={onMapLoad}
      ref={mapRef as any}
      mapStyle={mapStyle}
      touchZoomRotate={isInteractive}
      scrollZoom={isInteractive}
      doubleClickZoom={isInteractive}
      dragPan={isInteractive}
    >
      <Source type="geojson" data={shapeURI || shape}>
        <Layer {...(dataLayer as any)} />
      </Source>
    </MapContainer>
  );
};

export const useMapListeners = (
  onMoveEnd: () => void,
  onZoomEnd: () => void,
) => {
  const attachListeners = (map: Map) => {
    if (!map) return;

    map.on('moveend', onMoveEnd);
    map.on('zoomend', onZoomEnd);

    return () => {
      map.off('moveend', onMoveEnd);
      map.off('zoomend', onZoomEnd);
    };
  };

  return attachListeners;
};
