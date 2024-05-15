import React from 'react';
import {
  Platform,
  View,
  SafeAreaView,
  Dimensions,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Mapbox, { ShapeSource, offlineManager, Camera } from '@rnmapbox/maps';
import { AlertDialog } from 'native-base';
import { RButton, RInput } from '@packrat/ui';

import { MAPBOX_ACCESS_TOKEN } from '@packrat/config';

import { theme } from '../../theme';
import MapButtonsOverlay from './MapButtonsOverlay';
import {
  isShapeDownloadable,
  isPoint,
  isLineString,
  isPolygonOrMultiPolygon,
  multiPolygonBounds,
} from '../../utils/mapFunctions';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { DOMParser } from 'xmldom';
import { gpx as toGeoJSON } from '@tmcw/togeojson';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useNativeMap } from 'app/hooks/map/useNativeMap';

Mapbox.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox');
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

// console.log("MAPBOX_ACCESS_TOKEN", MAPBOX_ACCESS_TOKEN, typeof MAPBOX_ACCESS_TOKEN)
// consts

// MapView.setConnected(true);

function NativeMap({ shape: shapeProp }) {
  const styles = useCustomStyles(loadStyles);
  const {
    camera,
    mapViewRef,
    cancelRef,
    location,
    mapFullscreen,
    setMapFullscreen,
    progress,
    downloading,
    mapStyle,
    setMapStyle,
    showMapNameInputDialog,
    setShowMapNameInputDialog,
    shape,
    setShape,
    mapName,
    setMapName,
    trailCenterPoint,
    setTrailCenterPoint,
    zoomLevel,
    getPosition,
    onDownload,
    fullMapDimension,
    previewMapStyle,
  } = useNativeMap({ shape: shapeProp });

  function CircleCapComp() {
    return (
      <View
        style={{
          height: 18,
          width: 18,
          borderRadius: 16,
          borderWidth: 3,
          borderColor: 'white',
          backgroundColor: '#16b22d',
        }}
      ></View>
    );
  }

  const pointLatLong = shape?.features[0]?.geometry?.coordinates;
  const openMaps = (latLong) => {
    console.log(latLong.join(','), 'lat long');
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = latLong.join(',');
    // console.log('shape?.features[0]?.properties?.name',shape?.features[0]?.properties?.name)
    const label = shape?.features[0]?.properties?.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  const element = (
    <View style={mapFullscreen ? fullMapDimension : previewMapStyle}>
      <Mapbox.MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        styleURL={mapStyle}
        // onDidFinishRenderingMapFully={onMapLoaded}
        compassEnabled={false}
        logoEnabled={false}
        scrollEnabled={mapFullscreen}
        zoomEnabled={mapFullscreen}
      >
        <Mapbox.Camera
          ref={camera}
          zoomLevel={zoomLevel ? zoomLevel - 0.8 : 10}
          centerCoordinate={
            isPoint(shape)
              ? pointLatLong
              : isPolygonOrMultiPolygon(shape)
                ? multiPolygonBounds(shape.features[0])
                : trailCenterPoint
          }
          animationMode={'flyTo'}
          animationDuration={2000}
        />
        {/* // user location */}
        <Mapbox.PointAnnotation
          id={'1212'}
          coordinate={[location.longitude, location.latitude]}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
          >
            <MaterialCommunityIcons
              name="map-marker"
              size={35}
              color={'#de0910'}
            />
          </View>
        </Mapbox.PointAnnotation>
        {/* trail */}
        {isPoint(shape) ? (
          <Mapbox.PointAnnotation
            id="destination"
            coordinate={pointLatLong}
            onSelected={() => {
              console.log('selected');
              openMaps(pointLatLong);
            }}
          >
            {/* <CircleCapComp /> */}
            <View>
              <MaterialCommunityIcons
                name="map-marker"
                size={35}
                color={'#de0910'}
              />
            </View>
          </Mapbox.PointAnnotation>
        ) : isLineString(shape) ? (
          <>
            <Mapbox.ShapeSource
              id="source1"
              lineMetrics={true}
              shape={shape.features[0]}
              cluster
              clusterRadius={80}
              clusterMaxZoomLevel={14}
              style={{ zIndex: 1 }}
            >
              <Mapbox.LineLayer id="layer1" style={styles.lineLayer} />
            </Mapbox.ShapeSource>
            {/* // top location */}
            {shape?.features[0]?.geometry?.coordinates?.length > 0 && (
              <Mapbox.PointAnnotation
                id={'1212'}
                coordinate={[location.longitude, location.latitude]}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={35}
                    color={'#de0910'}
                  />
                </View>
              </Mapbox.PointAnnotation>
            )}
          </>
        ) : (
          <Mapbox.ShapeSource id={'some-feature'} shape={shape.features[0]}>
            <Mapbox.LineLayer
              sourceID="some-feature"
              id="some-feature-line"
              style={{
                lineColor: '#ffffff',
                lineWidth: 10,
              }}
            />
            <Mapbox.FillLayer
              id="multipolygonFill"
              style={{ fillOpacity: 0.5 }}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>

      <MapButtonsOverlay
        mapFullscreen={mapFullscreen}
        enableFullScreen={() => {
          setMapFullscreen(true);
        }}
        disableFullScreen={() => {
          setMapFullscreen(false);
        }}
        handleChangeMapStyle={setMapStyle}
        fetchLocation={() => {
          getPosition((location) => {
            setTrailCenterPoint([location.latitude, location.longitude]);
          });
        }}
        styles={styles}
        downloadable={isShapeDownloadable(shape)}
        downloading={downloading}
        shape={shape}
        onDownload={() => {
          setShowMapNameInputDialog(true);
        }}
        handleGpxUpload={async () => {
          try {
            const result = await DocumentPicker.getDocumentAsync({
              type: '*/*',
            });
            if (result.type === 'success') {
              const gpxString = await FileSystem.readAsStringAsync(result.uri);
              const parsedGpx = new DOMParser().parseFromString(gpxString);
              const geojson = toGeoJSON(parsedGpx);
              setShape(geojson);
            }
          } catch (err) {
            Alert.alert('An error occured');
          }
        }}
        progress={progress}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 10 }}>
      {!mapFullscreen ? (
        element
      ) : (
        <>
          <Modal
            visible={true}
            // style={{ backgroundColor: "#000", height: "100%" }}
          >
            {element}
          </Modal>
          <AlertDialog
            isOpen={showMapNameInputDialog}
            onClose={() => {
              setShowMapNameInputDialog(false);
            }}
            leastDestructiveRef={cancelRef}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>
                Enter the name you wish to save this map as:
              </AlertDialog.Header>
              <AlertDialog.Body>
                <RInput
                  onChangeText={(text) => {
                    setMapName(text);
                  }}
                  value={mapName}
                  mx="3"
                  placeholder="map name"
                  w="100%"
                />
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <RButton.Group space={2}>
                  <RButton
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => {
                      setShowMapNameInputDialog(false);
                    }}
                    ref={cancelRef}
                  >
                    Cancel
                  </RButton>
                  <RButton
                    colorScheme="success"
                    onPress={async () => {
                      setShowMapNameInputDialog(false);
                      const downloadOptions = {
                        name: mapName,
                        styleURL: 'mapbox://styles/mapbox/outdoors-v11',
                        bounds: await mapViewRef.current.getVisibleBounds(),
                        minZoom: 0,
                        maxZoom: 8,
                        metadata: {
                          shape: JSON.stringify(shape),
                        },
                      };

                      onDownload(downloadOptions);
                      setShowMapNameInputDialog(false);
                    }}
                  >
                    OK
                  </RButton>
                </RButton.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </>
      )}
    </SafeAreaView>
  );
}

const loadStyles = () => ({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    // height: 500,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  map: {
    flex: 1,
  },
  lineLayer: {
    lineColor: '#16b22d',
    lineWidth: 4,
    lineOpacity: 1,
  },
  headerView: {
    position: 'absolute',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 100,
  },
  headerBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: 'white',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NativeMap;
