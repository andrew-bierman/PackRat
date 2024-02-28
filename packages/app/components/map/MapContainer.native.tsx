import React from 'react';

import { View, Platform } from 'react-native';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { defaultShape } from '../../utils/mapFunctions';
import useTheme from '../../hooks/useTheme';
import NativeMap from './NativeMap';
import useCustomStyles from 'app/hooks/useCustomStyles';

export function MapContainer({ shape }) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  if (!shape || isObjectEmpty(shape)) {
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

const loadStyles = () => ({
  webContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'fit-content',
  },
  nativeContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
});
