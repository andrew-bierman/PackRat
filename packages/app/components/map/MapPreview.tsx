import { RImage } from '@packrat/ui';
import { useProcessedShape, useMapPreviewData } from './useMapPreview';
import { useAuthUserToken } from 'app/modules/auth';
export default function MapPreview({ shape }) {
  const processedShape = useProcessedShape(shape);
  const { token } = useAuthUserToken();
  const mapPreviewData: any = useMapPreviewData(shape, processedShape);

  if (!mapPreviewData) return null;

  return (
    <RImage
      style={{
        width: '100%',
        height: '100%',
      }}
      source={{
        uri: mapPreviewData.uri,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }}
    />
  );
}
