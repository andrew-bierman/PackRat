import React, { type FC } from 'react';
import { StatusLabel } from './StatusLabel';
import { View, RText, Card, YStack, Details } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import { TouchableOpacity } from 'react-native';
import { MapImage } from './MapImage';

interface MapPreviewCardProps {
  id: string;
  title: string;
  isDownloaded: boolean;
  onShowMapClick: (id: string) => void;
}

export const MapPreviewCard: FC<MapPreviewCardProps> = ({
  id,
  onShowMapClick,
  title,
  isDownloaded,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  return (
    <Card
      title={title}
      subtitle={isDownloaded ? <StatusLabel /> : null}
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
