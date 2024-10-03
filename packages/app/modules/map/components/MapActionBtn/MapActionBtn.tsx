import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { type FC } from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

interface MapActionBtnProps extends TouchableOpacityProps {}

export const MapActionBtn: FC<MapActionBtnProps> = ({ style, ...props }) => {
  const styles = useCustomStyles(loadStyles);

  return <TouchableOpacity style={[styles.mapActionBtn, style]} {...props} />;
};

const loadStyles = () => ({
  mapActionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-only',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});
