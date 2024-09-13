import React, { type FC } from 'react';
import { Map as LibMap } from '@packrat/map';
import { StyleSheet, View } from 'react-native';

interface MapProps {
  shape: any;
}

export const Map: FC<MapProps> = ({ shape }) => {
  return <LibMap shape={shape} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
