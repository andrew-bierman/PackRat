import React, { type FC } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MapActionBtn } from '../MapActionBtn';
import { type TouchableOpacityProps } from 'react-native';

interface MapStylePickerProps {
  isFullScreenMode: boolean;
  toggleFullscreen: () => void;
  style?: TouchableOpacityProps['style'];
}

export const FullscreenBtn: FC<MapStylePickerProps> = ({
  isFullScreenMode,
  toggleFullscreen,
  style,
}) => {
  return (
    <MapActionBtn onPress={toggleFullscreen} style={style}>
      <Entypo
        name={isFullScreenMode ? 'circle-with-cross' : 'resize-full-screen'}
        size={21}
        color="grey"
      />
    </MapActionBtn>
  );
};
