import { RImage } from '@packrat/ui';
import { useMapPreview } from './useMapPreview';
import { useMapPreviewUri } from './useMapPreviewUri';

export default function MapPreview({ shape }) {
  const mapPreviewData = useMapPreview(shape);
  const mapPreviewUri = useMapPreviewUri(mapPreviewData);

  return (
    <RImage
      style={{
        width: '100%',
        height: '100%',
      }}
      source={{
        uri: mapPreviewUri,
      }}
    />
  );
}
