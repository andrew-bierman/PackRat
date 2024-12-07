import React from 'react';

import { View, Platform } from 'react-native';

import WebMap from './WebMap';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { defaultShape } from '../../utils/mapFunctions';
import useCustomStyles from '~/hooks/useCustomStyles';

export function MapContainer({ shape }) {
  if (isObjectEmpty(shape)) {
    shape = defaultShape;
  }
  const styles = useCustomStyles(loadStyles);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <WebMap shape={shape} />
      </View>
    );
  }
}

export default MapContainer;

const loadStyles = () => ({
  webContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: '10px',
    width: '100%',
    height: '400px',
    borderRadius: '10px',
  },
});
