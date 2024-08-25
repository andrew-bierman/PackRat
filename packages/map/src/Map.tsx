import { MAPBOX_ACCESS_TOKEN } from '@packrat/config';
import { useWebMap } from './hooks/useWebMap';
import mapboxgl from 'mapbox-gl';
import React, { type FC, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { isPolygonOrMultiPolygon } from './utils/mapFunctions';
import MapButtonsOverlay from './MapButtonsOverlay';
import MapPreview from './MapPreview';
import useGpxUpload from './useGpxUpload';
import { type MapProps } from './models';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const WebMap: FC<MapProps> = ({ shape: shapeProp }) => {
  const [downloadable, setDownloadable] = useState(false);
  const styles = StyleSheet.create(loadStyles);
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
  } = useWebMap({ shape: shapeProp });

  const handleGpxUpload = useGpxUpload(setShape);

  const element = (
    <View style={[styles.container, { height: showModal ? '100%' : 400 }]}>
      {/* {showModal || isPolygonOrMultiPolygon(shape) ? ( */}
      <View
        key="map"
        ref={mapContainer}
        style={{
          ...styles.map,
          height: isPolygonOrMultiPolygon(shape) ? 200 : '100%',
        }}
      />
      {/* ) : (
        <MapPreview shape={shape} />
      )} */}
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
        onDownload={fetchGpxDownload}
        handleGpxUpload={handleGpxUpload}
        shape={shape}
      />
    </View>
  );

  // TODO: Fix this. The modal is not working as expected.
  // return element;

  return (
    <>
      <Modal animationType={'fade'} transparent={false} visible={showModal}>
        {element}
      </Modal>
      {!showModal && element}
    </>
  );

  // return showModal ? (
  //   <Modal animationType={'fade'} transparent={false} visible={showModal}>
  //     {element}
  //   </Modal>
  // ) : (
  //   element
  // );
};

const loadStyles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
  },
  map: {
    width: '100%',
    minHeight: '100%',
    // minHeight: '100vh', // Adjust the height to your needs
  },
  modal: {
    alignItems: 'center',
  },
} as const;

export default WebMap;
