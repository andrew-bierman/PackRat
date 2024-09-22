import React, { useCallback, useRef, type FC } from 'react';
import { MapView } from '../lib';
import { type ViewProps } from 'react-native';
import { useMapStyles, useMapFullScreen } from '../hooks';
import { MapStylePicker, FullscreenBtn } from '../components';
import { FullScreen } from '@packrat/ui';
import { MapButtonsOverlay } from './MapButtonsOverLay';

interface MapProps {
  shape: any;
  style?: ViewProps['style'];
}

export const Map: FC<MapProps> = ({
  shape,
  style = { width: '100%', height: 420, position: 'relative' },
}) => {
  const mapBoundsRef = useRef([]);
  const { selectedStyle, mapStyles, onStyleChange } = useMapStyles();
  const { isFullScreenMode, toggleFullScreen } = useMapFullScreen();

  const handleMapBoundsChange = useCallback((bounds) => {
    mapBoundsRef.current = bounds;
  }, []);

  return (
    <FullScreen defaultStyles={style} isFullScreen={isFullScreenMode}>
      <MapView
        shape={shape}
        mapStyle={selectedStyle}
        onVisibleBoundsChange={handleMapBoundsChange}
      />
      <MapButtonsOverlay currentBounds={mapBoundsRef} shape={shape}>
        <MapStylePicker
          btnStyle={{ position: 'absolute', top: 10, left: 10 }}
          mapStyles={mapStyles}
          onStyleChange={onStyleChange}
        />
        <FullscreenBtn
          style={{ position: 'absolute', top: 10, right: 10 }}
          toggleFullscreen={toggleFullScreen}
          isFullScreenMode={isFullScreenMode}
        />
      </MapButtonsOverlay>
    </FullScreen>
  );
};
