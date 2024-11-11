import React, { type FC } from 'react';
import { type MapButtonsOverlayProps } from './model';
import { DownloadMapBtn } from '../../components/DownloadMapBtn';
import { Platform } from 'react-native';

export const MapButtonsOverlay: FC<MapButtonsOverlayProps> = ({
  children,
  currentBounds,
  shape,
  shouldEnableDownload,
}) => {
  const isNative = Platform.OS !== 'web';
  return (
    <>
      {/* DISABLE OFFLINE MAPS */}
      {shouldEnableDownload && isNative ? (
        <DownloadMapBtn
          currentBounds={currentBounds}
          shape={shape}
          style={{ position: 'absolute', bottom: 80, left: 10 }}
        />
      ) : null}
      {children}
    </>
  );
};
