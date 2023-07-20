import React, { useEffect, useState, useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
// import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import Mapbox, { ShapeSource, offlineManager, Camera } from "@rnmapbox/maps";
import {
  Select,
  Center,
  AlertDialog,
  Button,
  Input,
  Box,
  Actionsheet,
  CheckIcon,
  useToast,
} from "native-base";

// get mapbox access token from .env file
import { MAPBOX_ACCESS_TOKEN } from "@env";

import { theme } from "../../theme";
import MapButtonsOverlay from "./MapButtonsOverlay";
import {
  calculateZoomLevel,
  findTrailCenter,
  getShapeSourceBounds,
  isShapeDownloadable,
  mapboxStyles,
} from "../../utils/mapFunctions";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { DOMParser } from "xmldom";
import { gpx as toGeoJSON } from "@tmcw/togeojson";
import togpx from "togpx";

Mapbox.setWellKnownTileServer(Platform.OS === "android" ? "Mapbox" : "mapbox");
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

// console.log("MAPBOX_ACCESS_TOKEN", MAPBOX_ACCESS_TOKEN, typeof MAPBOX_ACCESS_TOKEN)
// consts
const dw = Dimensions.get("screen").width;
const fullMapDimension = { width: dw, height: "100%" };
const previewMapStyle = {
  width: dw * 0.9,
  height: 220,
  borderRadius: 20,
  overflow: "hidden",
  alignSelf: "center",
};

// MapView.setConnected(true);

function NativeMap({ shape: shapeProp }) {
  const camera = useRef(null);
  const mapViewRef = useRef(null);
  const cancelRef = React.useRef(null);
  const [location, setLocation] = useState({
    longitude: 0.0,
    latitude: 0.0,
  });
  const [getLocationLoading, setGetLocationLoading] = useState(false);
  const [correctLocation, setCorrectLocation] = useState(false);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [mapStyle, setMapStyle] = useState(mapboxStyles[0].style);
  const [showMapNameInputDialog, setShowMapNameInputDialog] = useState(false);
  const [shape, setShape] = useState(shapeProp);
  const [mapName, setMapName] = useState(shape?.features[0]?.properties?.name);

  const toast = useToast();

  // consts
  const trailCenterPoint = findTrailCenter(shape);
  let bounds = getShapeSourceBounds(shape);
  bounds = bounds[0].concat(bounds[1]);
  const zoomLevel = calculateZoomLevel(bounds, { width: dw, height: 360 });
  console.log("trailCenterPoint", trailCenterPoint);
  console.log("zoomLevel", zoomLevel);

  // effects
  useEffect(() => {
    // update the shape state when a new shapeProp gets passed
    if (shapeProp !== shape) setShape(shapeProp);
  }, [shapeProp]);

  useEffect(() => {
    // update mapName whenever shape changes e.g newly passed shapeProp or new shape from gpx upload
    setMapName(shape?.features[0]?.properties?.name);
  }, [shape]);

  // functions
  const getPosition = (onSucccess) => {
    Geolocation.getCurrentPosition(
      (data) => {
        setLocation({
          ...location,
          longitude: Number(data.coords.longitude),
          latitude: Number(data.coords.latitude),
        });
        setCorrectLocation(true);
        onSucccess && onSucccess(location);
      },
      (error) => {
        setCorrectLocation(false);
        Alert.alert("Something went wrong with location", error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

  function onMapPress(event) {
    console.log(event, "eventtt");
    // if (trailCenterPoint) {
    //   mapViewFullScreenRef?.current.setCamera({
    //     centerCoordinate: trailCenterPoint,
    //   });
    // }
  }

  function onDownloadProgress(offlineRegion, offlineRegionStatus) {
    setProgress(offlineRegionStatus.percentage);
    setDownloading(true);
    if (offlineRegionStatus.percentage == 100) {
      setDownloading(false);
    }
  }
  function errorListener(offlineRegion, error) {
    Alert.alert(error.message);
  }
  function onDownload(optionsForDownload) {
    // start download
    offlineManager
      .createPack(optionsForDownload, onDownloadProgress, errorListener)
      .catch((error) => {
        Alert.alert(error.message);
      });
  }
  function CircleCapComp() {
    return (
      <View
        style={{
          height: 18,
          width: 18,
          borderRadius: 16,
          borderWidth: 3,
          borderColor: "white",
          backgroundColor: "#16b22d",
        }}
      ></View>
    );
  }

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
          centerCoordinate={trailCenterPoint ? trailCenterPoint : null}
          animationMode={"flyTo"}
          animationDuration={2000}
        />
        {/* // user location */}
        <Mapbox.PointAnnotation
          id={"1212"}
          coordinate={[location.longitude, location.latitude]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <MaterialCommunityIcons
              name="map-marker"
              size={35}
              color={"#de0910"}
            />
          </View>
        </Mapbox.PointAnnotation>
        {/* trail */}
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
            id={"cicleCap"}
            coordinate={
              shape?.features[0]?.geometry?.coordinates[
                shape?.features[0]?.geometry?.coordinates?.length - 1
              ]
            }
          >
            <View>
              <CircleCapComp />
            </View>
          </Mapbox.PointAnnotation>
        )}
      </Mapbox.MapView>
      <MapButtonsOverlay
        mapFullscreen={mapFullscreen}
        enableFullScreen={() => setMapFullscreen(true)}
        disableFullScreen={() => setMapFullscreen(false)}
        handleChangeMapStyle={setMapStyle}
        fetchLocation={() =>
          getPosition((location) => {
            // setTrailCenterPoint([location.latitude, location.longitude])
            // TODO
          })
        }
        styles={styles}
        downloadable={isShapeDownloadable(shape)}
        downloading={downloading}
        shape={shape}
        onDownload={() => setShowMapNameInputDialog(true)}
        handleGpxUpload={async () => {
          try {
            const result = await DocumentPicker.getDocumentAsync({
              type: "*/*",
            });
            if (result.type === "success") {
              const gpxString = await FileSystem.readAsStringAsync(result.uri);
              const parsedGpx = new DOMParser().parseFromString(gpxString);
              const geojson = toGeoJSON(parsedGpx);
              setShape(geojson);
            }
          } catch (err) {
            Alert.alert("An error occured");
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
            onClose={() => setShowMapNameInputDialog(false)}
            leastDestructiveRef={cancelRef}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>
                Enter the name you wish to save this map as:
              </AlertDialog.Header>
              <AlertDialog.Body>
                <Input
                  onChangeText={(text) => setMapName(text)}
                  value={mapName}
                  mx="3"
                  placeholder="map name"
                  w="100%"
                />
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => setShowMapNameInputDialog(false)}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="success"
                    onPress={async () => {
                      setShowMapNameInputDialog(false);
                      try {
                        const downloadOptions = {
                          name: mapName,
                          styleURL: "mapbox://styles/mapbox/outdoors-v11",
                          bounds: await mapViewRef.current.getVisibleBounds(),
                          minZoom: 0,
                          maxZoom: 15,
                          metadata: {
                            gpx: fileUri,
                          },
                        };
                        console.log("downloaddinggg...");
                        const toGpxOptions = {
                          creator: "PackRat", // Hardcoded creator option
                          metadata: {
                            name: mapName || "", // Extract name from geoJSON (if available)
                            desc: shape.description || "", // Extract description from geoJSON (if available)
                          },
                          //   featureTitle: (properties) => properties.name || "", // Extract feature title from properties (if available)
                          //   featureDescription: (properties) => properties.description || "", // Extract feature description from properties (if available)
                        };
                        const gpx = togpx(shape, toGpxOptions);
                        console.log("gpx", gpx);
                        const fileUri =
                          FileSystem.documentDirectory + mapName + ".gpx";
                        console.log("fileUri", fileUri);
                        await FileSystem.writeAsStringAsync(fileUri, gpx);
                        toast.show({ description: fileUri });
                        setMapName("");
                        onDownload(downloadOptions);
                        toast.show({
                          description: "Region now available for offline",
                        });
                      } catch (err) {
                        console.log("error downloading map", err);
                        Alert.alert("Error", "Failed to download map.");
                        setShowMapNameInputDialog(false);
                      }
                    }}
                  >
                    OK
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    // height: 500,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  map: {
    flex: 1,
  },
  lineLayer: {
    lineColor: "#16b22d",
    lineWidth: 4,
    lineOpacity: 1,
  },
  headerView: {
    position: "absolute",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
  },
  headerBtnView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    backgroundColor: "white",
  },
  button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NativeMap;
