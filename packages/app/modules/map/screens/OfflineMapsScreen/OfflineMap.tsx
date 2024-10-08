import React, { useState, type FC } from 'react';

import { type OfflineMap } from './OfflineMapsScreen';
import { getMapGEOURI, Map } from 'app/modules/map';

interface OfflineMapProps {
  map: OfflineMap;
  onClose: () => void;
}
export const OfflineMapComponent: FC<OfflineMapProps> = ({ map, onClose }) => {
  return (
    <Map
      shapeURI={!map.downloaded ? getMapGEOURI(map.id) : undefined}
      offlineMapName={map.name}
      shouldEnableDownload={!map.downloaded}
      onExitFullScreen={onClose}
      initialBounds={map.bounds}
    />
  );
};
