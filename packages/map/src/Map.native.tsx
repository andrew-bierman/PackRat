import React from 'react';
import {
  Platform,
  View,
  SafeAreaView,
  Modal,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { AlertDialog } from 'native-base';
import {
  RButton as OriginalRButton,
  RInput as OriginalRInput,
  RStack,
  RText,
} from '@packrat/ui';

import { MAPBOX_ACCESS_TOKEN } from '@packrat/config';

import {
  isLineString,
  isPoint,
  isPolygonOrMultiPolygon,
  isShapeDownloadable,
  multiPolygonBounds,
  validateCoordinates,
  validateShape,
} from './utils/mapFunctions';
import MapButtonsOverlay from './MapButtonsOverlay';

import { gpx as toGeoJSON } from '@tmcw/togeojson';
import { useNativeMap } from './hooks/useNativeMap';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { DOMParser } from 'xmldom';
import { type MapPropsLegacy } from './models';
import { useUserQuery } from 'app/modules/auth';
import { useUpdateUser } from 'app/modules/user';

interface GeoJsonProperties {
  name?: string;
}

interface Geometry {
  type: string;
  coordinates: any;
}

interface Feature {
  type: 'Feature';
  properties?: GeoJsonProperties;
  geometry: Geometry;
}

interface Shape {
  features: Feature[];
}

const RButton: any = OriginalRButton;
const RInput: any = OriginalRInput;

Mapbox.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox');
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const NativeMap: React.FC<MapPropsLegacy> = ({
  shape: shapeProp,
  onExitFullScreen,
  mapName: predefinedMapName,
  forceFullScreen = false,
  shouldEnableDownload = true,
}) => {
  const { user, refetch } = useUserQuery();
  console.log({ user });
  const updateUser = useUpdateUser();
  const styles = StyleSheet.create(loadStyles);
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
    mapName: rawMapName,
    setMapName,
    trailCenterPoint,
    setTrailCenterPoint,
    zoomLevel,
    getPosition,
    onDownload,
    fullMapDimension,
    previewMapStyle,
  } = useNativeMap({ shape: shapeProp });

  // For some reason not setting default state value not working from hook
  const isFullScreenMode = forceFullScreen || mapFullscreen;

  const mapName = rawMapName?.trim();
  const mapNameErrorMessage = !mapName
    ? 'The map name must not be empty'
    : user?.offlineMaps?.[mapName?.toLowerCase()] != null
      ? 'A map with the same name already exist'
      : '';

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
        setShape(geojson as Shape);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDownloadMap = async () => {
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

    // Save the map under user profile.
    updateUser({
      id: user.id,
      offlineMaps: {
        ...(user.offlineMaps || {}),
        [mapName.toLowerCase()]: downloadOptions,
      },
    })
      .then(async () => refetch())
      .then(() => {
        onDownload(downloadOptions);
      })
      .catch(() => {});
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
      validateCoordinates(bounds);
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
    throw new Error(error);
  }

  const element = (
    <View
      style={isFullScreenMode ? (fullMapDimension as any) : previewMapStyle}
    >
      <Mapbox.MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        styleURL={mapStyle}
        compassEnabled={false}
        logoEnabled={false}
        scrollEnabled={isFullScreenMode}
        zoomEnabled={isFullScreenMode}
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
              shape={shape.features[0] as GeoJSON.Feature<GeoJSON.Geometry>}
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
          <Mapbox.ShapeSource
            id={'some-feature'}
            shape={shape.features[0] as GeoJSON.Feature<GeoJSON.Geometry>}
          >
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
        mapFullscreen={isFullScreenMode}
        enableFullScreen={() => {
          setMapFullscreen(true);
        }}
        disableFullScreen={() => {
          onExitFullScreen?.();
          setMapFullscreen(false);
        }}
        handleChangeMapStyle={setMapStyle}
        fetchLocation={() => {
          getPosition((location) => {
            setTrailCenterPoint([location.latitude, location.longitude]);
          });
        }}
        styles={styles}
        downloadable={shouldEnableDownload && isShapeDownloadable(shape)}
        downloading={downloading}
        shape={shape}
        onDownload={() => {
          if (predefinedMapName) {
            handleDownloadMap();
          } else {
            setShowMapNameInputDialog(true);
          }
        }}
        handleGpxUpload={shouldEnableDownload && handleShapeUpload}
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
                  value={rawMapName}
                  mx="3"
                  placeholder="map name"
                  w="100%"
                />
                <RText style={styles.mapNameFieldErrorMessage}>
                  {mapNameErrorMessage}
                </RText>
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
                    disabled={!!mapNameErrorMessage}
                    onPress={() => {
                      setShowMapNameInputDialog(false);
                      handleDownloadMap();
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
};

const loadStyles = {
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
    backgroundColor: 'blue', // theme.colors.primary,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapNameFieldErrorMessage: {
    color: 'red', // theme.colors.error,
    fontStyle: 'italic',
    fontSize: 12,
  },
};

export default NativeMap;
