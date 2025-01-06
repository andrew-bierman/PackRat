import React, { useEffect, useState, type FC } from 'react';
import { StatusLabel } from './StatusLabel';
import { View, RText, Card } from '@packrat/ui';
import { TouchableOpacity } from 'react-native';
import { MapImage } from './MapImage';
import { Entypo } from '@expo/vector-icons';
import { useDownloadMapProgress } from 'app/modules/map/hooks/useDownloadMapProgress';
import { type OfflineMap } from 'app/modules/map/screens/OfflineMapsScreen';

interface MapPreviewCardProps {
  id: string;
  item: OfflineMap;
  onShowMapClick: (id: string) => void;
  isDownloaded?: boolean;
}

export const MapPreviewCard: FC<MapPreviewCardProps> = ({
  id,
  onShowMapClick,
  item,
}) => {
  const [isDownloaded, setIsDownloaded] = useState(item.downloaded);
  const { downloadMap, isDownloading, progress } = useDownloadMapProgress(() =>
    setIsDownloaded(true),
  );

  const handleDownloadMap = () => {
    downloadMap({
      name: item.name,
      bounds: item.bounds,
      styleURL: item.styleURL,
      minZoom: item.minZoom,
      maxZoom: item.maxZoom,
      metadata: {
        id: item.id,
        userId: item.userId,
      },
    });
  };

  useEffect(() => {
    setIsDownloaded(item.downloaded);
  }, [item.downloaded]);

  return (
    <Card
      title={item.name}
      subtitle={
        isDownloaded ? (
          <StatusLabel />
        ) : (
          <TouchableOpacity onPress={handleDownloadMap}>
            {isDownloading ? (
              <RText style={{ color: '#000' }}>{`${progress}%`}</RText>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <Entypo name={'download'} size={16} color="grey" />
                <RText>Download</RText>
              </View>
            )}
          </TouchableOpacity>
        )
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
