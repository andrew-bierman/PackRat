import React, { useEffect, useState, type FC } from 'react';

import { type OfflineMap } from './OfflineMapsScreen';
import { getMapGEOURI, Map } from 'app/modules/map';
import { readFile } from 'app/utils/fileSystemNative';

interface OfflineMapProps {
  map: OfflineMap;
  onClose: () => void;
}
export const OfflineMapComponent: FC<OfflineMapProps> = ({ map, onClose }) => {
  const [shape, setShape] = useState(undefined);

  useEffect(() => {
    (async () => {
      const [shapeData] = await readFile(`maps/${map.fileName}`);
      setShape(JSON.parse(shapeData));
    })();
  }, [map.id]);
  return (
    <Map
      shape={shape}
      offlineMapName={map.name}
      isFullScreenModeByDefault
      shouldEnableDownload={!map.downloaded}
      onExitFullScreen={onClose}
      initialBounds={map.bounds}
    />
  );
};
