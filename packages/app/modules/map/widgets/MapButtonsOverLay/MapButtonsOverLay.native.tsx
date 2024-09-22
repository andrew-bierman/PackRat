import React, { type FC } from 'react';
import { type MapButtonsOverlayProps } from './model';
import { DownloadMapBtn } from '../../components/DownloadMapBtn';

export const MapButtonsOverlay: FC<MapButtonsOverlayProps> = ({
  children,
  currentBounds,
  shape,
}) => {
  return (
    <>
      <DownloadMapBtn
        currentBounds={currentBounds}
        shape={shape}
        style={{ position: 'absolute', bottom: 80, left: 10 }}
      />
      {children}
    </>
  );
};
