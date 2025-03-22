import React, { useEffect, useState, type FC } from 'react';
import { StatusLabel } from './StatusLabel';
import { View, RText, Card, RStack } from '@packrat/ui';
import { TouchableOpacity } from 'react-native';
import { MapImage } from './MapImage';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useDownloadMapProgress } from 'app/modules/map/hooks/useDownloadMapProgress';
import { type OfflineMap } from 'app/modules/map/screens/OfflineMapsScreen';

interface MapPreviewCardProps {
  id: string;
  item: OfflineMap;
  onDelete: (item: OfflineMap) => void;
  onShowMapClick: (id: string) => void;
  isDownloaded?: boolean;
}

export const MapPreviewCard: FC<MapPreviewCardProps> = ({
  id,
  onShowMapClick,
  item,
  onDelete,
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
        <RStack>
          <TouchableOpacity onPress={() => onShowMapClick(id)}>
            <RText>Show map</RText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => onDelete(item)}
          >
            <MaterialIcons style={{ color: 'red' }} name="delete" size={20} />
          </TouchableOpacity>
        </RStack>
      }
    />
  );
};
