import React from 'react';
import { RImage } from '@packrat/ui';
import { useProcessedShape, useMapPreviewData } from './hooks/useMapPreview';
import { useGetObjectUrlFromImageUri } from './hooks/useGetObjectUrlFromImageUri';

export default function MapPreview({ shape }: { shape: unknown }) {
  const processedShape = useProcessedShape(shape);
  const mapPreviewData = useMapPreviewData(shape, processedShape);
  const uri = useGetObjectUrlFromImageUri(mapPreviewData?.uri || null);

  if (!mapPreviewData || !uri) return null;

  return (
    <RImage
      style={{
        width: '100%',
        height: '100%',
      }}
      source={{ uri }}
    />
  );
}
