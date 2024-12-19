import React, { type FC } from 'react';
import { type MapButtonsOverlayProps } from './model';
import { DownloadMapBtn } from '../../components/DownloadMapBtn';

export const MapButtonsOverlay: FC<MapButtonsOverlayProps> = ({
  children,
  currentBounds,
  shape,
  shouldEnableDownload,
}) => {
  return (
    <>
      {/* DISABLE OFFLINE MAPS */}
      {shouldEnableDownload ? (
        <DownloadMapBtn
          currentBounds={currentBounds}
          shape={shape}
          style={{ position: 'absolute', bottom: 10, left: 10 }}
        />
      ) : null}
      {children}
    </>
  );
};
