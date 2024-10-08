import React, { type FC } from 'react';
import { View } from '@packrat/ui';
import { MapPin } from '@tamagui/lucide-icons';
import { type ViewProps } from 'tamagui';

interface MapImageProps {
  style?: ViewProps['style'];
}

export const MapImage: FC<MapImageProps> = ({ style = {} }) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          width: '100%',
          paddingTop: 20,
          height: '100%',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <View>
        <MapPin />
      </View>
    </View>
  );
};
