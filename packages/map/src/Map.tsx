import React, { type FC } from 'react';
import { type MapProps } from './models';
import { MapContainer, GeoJSON } from 'react-leaflet';

const WebMap: FC<MapProps> = ({ shape }) => {
  return (
    <MapContainer>
      <GeoJSON data={shape} />
    </MapContainer>
  );
};

export default WebMap;
