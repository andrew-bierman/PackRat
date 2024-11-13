import React, { type FC } from 'react';
import { RText, Card } from '@packrat/ui';
import { TouchableOpacity } from 'react-native';
import { MapImage } from './MapImage';
import { type OfflineMap } from 'app/modules/map/screens/OfflineMapsScreen';
import { DownloadMapBtn } from '../DownloadMapBtn';

interface MapPreviewCardProps {
  id: string;
  item: OfflineMap;
  onShowMapClick: (id: string) => void;
}

export const MapPreviewCard: FC<MapPreviewCardProps> = ({
  id,
  onShowMapClick,
  item,
}) => {
  return (
    <Card
      title={item.name}
      subtitle={
        <DownloadMapBtn currentBounds={item.bounds} shape={item.bounds} />
      }
      link=""
      image={<MapImage />}
      isFullWidth
      type="secondary"
      actions={
        <TouchableOpacity onPress={() => onShowMapClick(id)}>
          <RText>Show map</RText>
        </TouchableOpacity>
      }
    />
  );
};
