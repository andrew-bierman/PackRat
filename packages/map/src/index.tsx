import React from 'react';
import { View } from 'react-native';
import { isObjectEmpty } from './utils/isObjectEmpty';
import { defaultShape } from './utils/mapFunctions';
import PlatformMap from './Map';
import type { MapPropsLegacy } from './models';

export const Map: React.FC<MapPropsLegacy> = ({
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
    <PlatformMap
      {...{
        shape,
        onExitFullScreen,
        predefinedMapName,
        forceFullScreen,
        shouldEnableDownload,
      }}
    />
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
