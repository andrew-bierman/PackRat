import React from 'react';

import { View, Platform } from 'react-native';

import WebMap from './WebMap.web';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { defaultShape } from '../../utils/mapFunctions';
import useCustomStyles from 'app/hooks/useCustomStyles';
import loadStyles from './MapStyles';
export function MapContainer({ shape }) {
  if (isObjectEmpty(shape)) {
    shape = defaultShape;
  }
  const styles = useCustomStyles(loadStyles);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainerWeb}>
        <WebMap shape={shape} />
      </View>
    );
  }
}

export default MapContainer;
