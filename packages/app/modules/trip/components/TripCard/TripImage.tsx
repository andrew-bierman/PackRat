import React, { type FC } from 'react';
import { View } from '@packrat/ui';
import { Package } from '@tamagui/lucide-icons';
import { type ViewProps } from 'tamagui';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

interface TripImageProps {
  style?: ViewProps['style'];
}

export const TripImage: FC<TripImageProps> = ({ style = {} }) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <View>
        <MaterialCommunityIcons name="routes" size={24} />
      </View>
    </View>
  );
};
