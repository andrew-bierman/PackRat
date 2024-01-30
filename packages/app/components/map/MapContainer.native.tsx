import React from 'react';

import { View, Platform } from 'react-native';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { defaultShape } from '../../utils/mapFunctions';
import useTheme from '../../hooks/useTheme';
import NativeMap from './NativeMap.native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import loadStyles from './MapStyles';

export function MapContainer({ shape }) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  if (isObjectEmpty(shape)) {
    shape = defaultShape;
  }

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return (
      <View
        style={[
          styles.nativeContainer,
          { backgroundColor: currentTheme.colors.white },
        ]}
      >
        <NativeMap shape={shape} />
      </View>
    );
  }
}

export default MapContainer;
