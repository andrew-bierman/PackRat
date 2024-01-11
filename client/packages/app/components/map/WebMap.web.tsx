import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '@env';

import { View, Modal, Alert } from 'react-native';
import { isPolygonOrMultiPolygon } from '../../utils/mapFunctions';
import MapButtonsOverlay from './MapButtonsOverlay';
import * as DocumentPicker from 'expo-document-picker';
import { gpx as toGeoJSON } from '@tmcw/togeojson';
import { DOMParser } from 'xmldom';
import MapPreview from './MapPreview';
import useCustomStyles from '~/hooks/useCustomStyles';
import { useWebMap } from '~/hooks/map/useWebMap';

// import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

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
  } = useWebMap({ shape: shapeProp });

  const element = (
    <View style={[styles.container, { height: showModal ? '100%' : '400px' }]}>
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
        onDownload={fetchGpxDownload}
        handleGpxUpload={async () => {
          console.log('clikedd');
          try {
            const result = await DocumentPicker.getDocumentAsync({
              type: 'application/gpx+xml',
            });
            console.log('result', result);
            if (result.type === 'success') {
              const base64Gpx = result.uri.split(',')[1];
              const gpxString = atob(base64Gpx);
              const parsedGpx = new DOMParser().parseFromString(gpxString);
              const geojson = toGeoJSON(parsedGpx);
              setShape(geojson);
            }
          } catch (err) {
            Alert.alert('An error occured');
          }
        }}
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
    borderRadius: '10px',
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
