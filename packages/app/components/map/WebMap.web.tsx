import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN, NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN } from '@env';

import { View, Modal, Alert } from 'react-native';
import { isPolygonOrMultiPolygon } from '../../utils/mapFunctions';
import MapButtonsOverlay from './MapButtonsOverlay';
import MapPreview from './MapPreview';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useWebMap } from 'app/hooks/map/useWebMap';
import useGpxUpload from './useGpxUpload';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN;

const DESTINATION = 'destination';
const TRIP = 'trip';
const WebMap = ({ shape: shapeProp }) => {
  const [downloadable, setDownloadable] = useState(false);
  const styles = useCustomStyles(loadStyles);
  const {
    shape,
    setShape,
    showModal,
    mapFullscreen,
    enableFullScreen,
    disableFullScreen,
    handleChangeMapStyle,
    fetchLocation,
    openMaps,
    fetchGpxDownload,
    downloading,
    mapContainer,
    startNavigation,
  } = useWebMap({ shape: shapeProp });

  const handleGpxUpload = useGpxUpload(setShape);

  const element = (
    <View style={[styles.container, { height: showModal ? '100%' : 400 }]}>
      {showModal || isPolygonOrMultiPolygon(shape) ? (
        <View
          key="map"
          ref={mapContainer}
          style={{
            ...styles.map,
            height: isPolygonOrMultiPolygon(shape) ? 200 : '100vh',
          }}
        />
      ) : (
        <MapPreview shape={shape} />
      )}
      <MapButtonsOverlay
        mapFullscreen={mapFullscreen}
        enableFullScreen={enableFullScreen}
        disableFullScreen={disableFullScreen}
        handleChangeMapStyle={handleChangeMapStyle}
        fetchLocation={fetchLocation}
        styles={styles}
        downloadable={downloadable}
        downloading={downloading}
        navigateToMaps={openMaps}
        startNavigation={startNavigation}
        onDownload={fetchGpxDownload}
        handleGpxUpload={handleGpxUpload}
        shape={shape}
      />
    </View>
  );

  return showModal ? (
    <Modal animationType={'fade'} transparent={false} visible={true}>
      {element}
    </Modal>
  ) : (
    element
  );
};

const loadStyles = () => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
  },
  map: {
    width: '100%',
    minHeight: '100vh', // Adjust the height to your needs
  },
  modal: {
    alignItems: 'center',
  },
});

export default WebMap;
