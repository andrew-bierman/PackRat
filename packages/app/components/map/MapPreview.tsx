import { RImage } from '@packrat/ui';
import { useProcessedShape, useMapPreviewData } from './useMapPreview';
export default function MapPreview({ shape }) {
  const processedShape = useProcessedShape(shape);
  const mapPreviewData = useMapPreviewData(shape, processedShape);

  console.log('mapPreviewData mapPreviewData', mapPreviewData?.uri, processedShape)

  if (!mapPreviewData) return null;

  return (
    <RImage
      style={{
        width: '100%',
        height: '100%',
      }}
      source={{
        uri: mapPreviewData.uri,
      }}
    />
  );
}
