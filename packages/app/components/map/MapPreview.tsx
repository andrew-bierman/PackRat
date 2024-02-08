import { RImage } from '@packrat/ui';
import { useProcessedShape } from './useProcessedShape';
import { useMapPreviewUrl } from './useMapPreviewUrl';

export default function MapPreview({ shape }) {
  const { processedShape, bounds, isPointShape } = useProcessedShape(shape);
  const url = useMapPreviewUrl(shape, processedShape, bounds, isPointShape);

  return (
    <RImage
      style={{
        width: '100%',
        height: '100%',
      }}
      source={{
        uri: url,
      }}
    />
  );
}
