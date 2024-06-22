import React from 'react';
import {
  Platform,
  View,
  SafeAreaView,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { AlertDialog } from 'native-base';
import {
  RButton as OriginalRButton,
  RInput as OriginalRInput,
  RStack,
} from '@packrat/ui';

import { MAPBOX_ACCESS_TOKEN } from '@packrat/config';

import { theme } from '../../theme';
import {
  isLineString,
  isPoint,
  isPolygonOrMultiPolygon,
  isShapeDownloadable,
  multiPolygonBounds,
  validateCoordinates,
  validateShape,
} from '../../utils/mapFunctions';
import MapButtonsOverlay from './MapButtonsOverlay';

import { gpx as toGeoJSON } from '@tmcw/togeojson';
import { useNativeMap } from 'app/hooks/map/useNativeMap';
import useCustomStyles from 'app/hooks/useCustomStyles';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { DOMParser } from 'xmldom';

const RButton: any = OriginalRButton;
const RInput: any = OriginalRInput;

Mapbox.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox');
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

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

  const handleShapeUpload = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (result.type === 'success') {
        const gpxString = await FileSystem.readAsStringAsync(result.uri);
        const parsedGpx = new DOMParser().parseFromString(gpxString);
        const geojson = toGeoJSON(parsedGpx);
        validateShape(geojson);
        setShape(geojson);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

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
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = latLong.join(',');
    const label = shape?.features[0]?.properties?.name;
    const url =
      Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      }) || '';
    if (url) {
      Linking.openURL(url);
    }
  };

  let validCenterCoordinate = [0, 0];
  try {
    if (isPoint(shape)) {
      validateCoordinates(pointLatLong);
      validCenterCoordinate = pointLatLong;
    } else if (isPolygonOrMultiPolygon(shape)) {
      const bounds = multiPolygonBounds(shape.features[0]);
      bounds.forEach(validateCoordinates);
      validCenterCoordinate = bounds;
    } else if (isLineString(shape)) {
      const firstCoord = shape.features[0].geometry.coordinates[0];
      validateCoordinates(firstCoord);
      validCenterCoordinate = firstCoord;
    } else {
      validateCoordinates(trailCenterPoint);
      validCenterCoordinate = trailCenterPoint;
    }
  } catch (error) {
    Alert.alert('Invalid Shape Coordinates', error.message);
    validCenterCoordinate = [0, 0];
  }

  const element = (
    <View style={mapFullscreen ? (fullMapDimension as any) : previewMapStyle}>
      <Mapbox.MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        styleURL={mapStyle}
        compassEnabled={false}
        logoEnabled={false}
        scrollEnabled={mapFullscreen}
        zoomEnabled={mapFullscreen}
      >
        <Mapbox.Camera
          ref={camera}
          zoomLevel={zoomLevel ? zoomLevel - 0.8 : 10}
          centerCoordinate={validCenterCoordinate}
          animationMode={'flyTo'}
          animationDuration={2000}
        />
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
              openMaps(pointLatLong);
            }}
          >
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
            >
              <Mapbox.LineLayer id="layer1" style={styles.lineLayer} />
            </Mapbox.ShapeSource>
            {/* top location */}
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
        handleGpxUpload={handleShapeUpload}
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
          <Modal visible={true}>{element}</Modal>
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
                <RStack
                  style={{
                    width: '60%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
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
                      const bounds = mapViewRef.current
                        ? await mapViewRef.current.getVisibleBounds()
                        : null;
                      const downloadOptions = {
                        name: mapName,
                        styleURL: 'mapbox://styles/mapbox/outdoors-v11',
                        bounds,
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
                </RStack>
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
