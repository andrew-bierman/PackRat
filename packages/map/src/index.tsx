import React from 'react';
import { View } from 'react-native';
import { isObjectEmpty } from './utils/isObjectEmpty';
import { defaultShape } from './utils/mapFunctions';
import PlatformMap from './Map';
import type { MapProps } from './models';

export const Map: React.FC<MapProps> = ({
  shape, // : shapeProp,
  onExitFullScreen,
  mapName: predefinedMapName,
  forceFullScreen = false,
  shouldEnableDownload = true,
}) => {
  if (!shape || isObjectEmpty(shape)) {
    shape = defaultShape;
  }

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        paddingHorizontal: 5,
        marginBottom: 20,
      }}
    >
      <PlatformMap
        {...{
          shape,
          onExitFullScreen,
          predefinedMapName,
          forceFullScreen,
          shouldEnableDownload,
        }}
      />
    </View>
  );
};

export default Map;

const loadStyles = () => ({
  webContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: 10,
    width: '100%',
    height: 'fit-content',
    // height: 400,
    borderRadius: 10,
  },
  nativeContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
});
