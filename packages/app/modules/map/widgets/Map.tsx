import React, { useCallback, useRef, type FC } from 'react';
import { MapView } from '../lib';
import { type ViewProps } from 'react-native';
import { useMapStyles, useMapFullScreen } from '../hooks';
import { MapStylePicker, FullscreenBtn } from '../components';
import { FullScreen } from '@packrat/ui';
import { MapButtonsOverlay } from './MapButtonsOverLay';

interface MapProps {
  shape?: any;
  shapeURI?: string;
  style?: ViewProps['style'];
  shouldEnableDownload?: boolean;
  onExitFullScreen?: () => void;
  onVisibleBoundsChange?: (bounds: number[]) => void;
  isFullScreenModeByDefault?: boolean;
  initialBounds?: any;
  offlineMapName?: string;
}

export const Map: FC<MapProps> = ({
  shape,
  shapeURI,
  style = { width: '100%', height: 420, position: 'relative' },
  shouldEnableDownload = true,
  offlineMapName,
  onVisibleBoundsChange,
  onExitFullScreen,
  isFullScreenModeByDefault,
  initialBounds,
}) => {
  const mapBoundsRef = useRef([]);
  const { selectedStyle, mapStyles, onStyleChange } = useMapStyles();
  const { isFullScreenMode, toggleFullScreen } = useMapFullScreen(
    isFullScreenModeByDefault,
  );

  const handleMapBoundsChange = useCallback((bounds) => {
    mapBoundsRef.current = bounds;
    onVisibleBoundsChange?.(bounds);
  }, []);

  return (
    <FullScreen defaultStyles={style} isFullScreen={isFullScreenMode}>
      <MapView
        shape={shape}
        shapeURI={shapeURI}
        offlineMapName={offlineMapName}
        isInteractive={isFullScreenMode}
        mapStyle={selectedStyle}
        onVisibleBoundsChange={handleMapBoundsChange}
        initialBounds={initialBounds}
      />
      <MapButtonsOverlay
        currentBounds={mapBoundsRef}
        shape={shape}
        shouldEnableDownload={shouldEnableDownload}
      >
        <MapStylePicker
          btnStyle={{ position: 'absolute', top: 10, left: 10 }}
          mapStyles={mapStyles}
          onStyleChange={onStyleChange}
        />
        <FullscreenBtn
          style={{ position: 'absolute', top: 10, right: 10 }}
          toggleFullscreen={() => {
            if (isFullScreenMode) {
              onExitFullScreen?.();
            }

            toggleFullScreen();
          }}
          isFullScreenMode={isFullScreenMode}
        />
      </MapButtonsOverlay>
    </FullScreen>
  );
};
