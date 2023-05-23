import React, { useEffect, useState, useRef } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
// import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import MapView, { ShapeSource } from "@rnmapbox/maps";
import { offlineManager, Camera } from "@rnmapbox/maps";
import { Select, Center, Box, CheckIcon } from "native-base";

// get mapbox access token from .env file
import { MAPBOX_ACCESS_TOKEN } from "@env";

import { theme } from "../../theme";
import { Link } from "expo-router";

MapView.setAccessToken(MAPBOX_ACCESS_TOKEN);
// consts
const dw = Dimensions.get("screen").width;
const dh = Dimensions.get("screen").height;
const fullMapDiemention = { width: dw, height: 360 };
const previewMapDiemension = { width: dw * 0.9, height: 220 };

// MapView.setConnected(true);

function CustomizedMap() {
  const camera = useRef(MapView.Camera);
  const mapViewRef = useRef(null);
  const mapViewFullScreenRef = useRef();

  const [style, setStyle] = React.useState(
    "mapbox://styles/mapbox/outdoors-v11"
  );

  const [location, setLocation] = useState({
    longitude: 0.0,
    latitude: 0.0,
  });
  const [getLocationLoading, setGetLocationLoading] = useState(false);
  const [correctLocation, setCorrectLocation] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [trailCenterPoint, setTrailCenterPoint] = useState(null);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  // consts
  const shape = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [-77.044211, 38.852924],
            [-77.045659, 38.860158],
            [-77.044232, 38.862326],
            [-77.040879, 38.865454],
            [-77.039936, 38.867698],
            [-77.040338, 38.86943],
            [-77.04264, 38.872528],
            [-77.03696, 38.878424],
            [-77.032309, 38.87937],
            [-77.030056, 38.880945],
            [-77.027645, 38.881779],
            [-77.026946, 38.882645],
            [-77.026942, 38.885502],
            [-77.028054, 38.887449],
            [-77.02806, 38.892088],
            [-77.03364, 38.892108],
            [-77.033643, 38.899926],
          ],
        },
      },
    ],
  };
  const optionsForDownload = {
    name: "Downlaod",
    styleURL: "mapbox://styles/mapbox/outdoors-v11",
    bounds: [getShapeSourceBounds(shape)[0], getShapeSourceBounds(shape)[1]],
    minZoom: 0,
    maxZoom: 21,
  };
  // useEffects
  useEffect(() => {
    getPosition();
  }, []);
  useEffect(() => {
    handleShapeSourceLoad(fullMapDiemention);
  }, []);
  // functions
  const getPosition = () => {
    Geolocation.getCurrentPosition(
      (data) => {
        setLocation({
          ...location,
          longitude: Number(data.coords.longitude),
          latitude: Number(data.coords.latitude),
        });
        setCorrectLocation(true);
      },
      (error) => {
        setCorrectLocation(false);
        Alert.alert("Something went wrong with location", error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };
  const goToMyLocation = () => {
    setGetLocationLoading(true);
    Geolocation.getCurrentPosition(
      (data) => {
        setLocation({
          ...location,
          longitude: Number(data.coords.longitude),
          latitude: Number(data.coords.latitude),
        });
        setCorrectLocation(true);
      },
      (error) => {
        if (!mountedRef.current) return null;
        setCorrectLocation(false);
        Alert.alert(
          "Something went wrong with current location",
          error.message
        );
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };
  function getShapeSourceBounds(shape) {
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;
    shape.features[0].geometry.coordinates.forEach((coord) => {
      const lng = coord[0];
      const lat = coord[1];

      if (lng < minLng) {
        minLng = lng;
      }
      if (lng > maxLng) {
        maxLng = lng;
      }
      if (lat < minLat) {
        minLat = lat;
      }
      if (lat > maxLat) {
        maxLat = lat;
      }
    });

    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  }

  function handleShapeSourceLoad({ width: width, height: height }) {
    if (shape?.features[0]?.geometry?.coordinates?.length > 1) {
      let bounds = getShapeSourceBounds(shape);
      bounds = bounds[0].concat(bounds[1]);
      calculateZoomLevel(bounds, { width: width, height: height });
      findTrailCenter();
    }
  }

  function latRad(lat) {
    var sin = Math.sin((lat * Math.PI) / 180);
    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }
  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }
  function calculateZoomLevel(
    bounds,
    mapDim = { width: width, height: height }
  ) {
    var WORLD_DIM = { height: 256, width: 256 };
    let ne = { lat: bounds[2], lng: bounds[3] };
    let sw = { lat: bounds[0], lng: bounds[1] };

    var latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

    var lngDiff = ne.lng - sw.lng;
    var lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);
    setZoomLevel(latZoom);
    // mapViewFullScreenRef?.current.setCamera({
    //   centerCoordinate: [location.longitude, location.latitude],
    //   zoomLevel: 13,
    //   animationDuration: 3000,
    // });
  }
  function findTrailCenter() {
    const trailCoords = shape?.features[0]?.geometry?.coordinates;
    const latitudes = trailCoords.map((coord) => coord[0]);
    const longitudes = trailCoords.map((coord) => coord[1]);
    const avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    const avgLongitude =
      longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
    setTrailCenterPoint([avgLatitude, avgLongitude]);
    // Set the initial state
  }
  function onMapPress(event) {
    console.log(event, "eventtt");
    // if (trailCenterPoint) {
    //   mapViewFullScreenRef?.current.setCamera({
    //     centerCoordinate: trailCenterPoint,
    //   });
    // }
  }

  function MapContainer({ coordinates }) {
    const [region, setRegion] = useState(null);

    return (
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        showsMyLocationButton
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000"
          strokeWidth={2}
        />
      </MapView>
    );
  }

  function changeMapStyle() {
    setMapFullscreen(true);
    handleShapeSourceLoad({ width: dw, height: 360 });
  }
  function onMapLoaded() {
    setZoomLevel(zoomLevel);
    // mapViewFullScreenRef.setCamera()
  }
  function onDownloadProgress(offlineRegion, offlineRegionStatus) {
    setProgress(offlineRegionStatus.percentage);
    setDownloading(true);
    if (offlineRegionStatus.percentage == 100) {
      setDownloading(false);
    }
  }
  function errorListener(offlineRegion, error) {
    Alert.alert(error);
  }
  function onDownload() {
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

  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      {mapFullscreen && (
        <Select
          selectedValue={style}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setStyle(itemValue)}
        >
          <Select.Item
            label="mapbox://styles/mapbox/dark-v10"
            value="mapbox://styles/mapbox/dark-v10"
          />
          <Select.Item
            label="mapbox://styles/mapbox/light-v10"
            value="mapbox://styles/mapbox/light-v10"
          />
          <Select.Item
            label="mapbox://styles/mapbox/outdoors-v11"
            value="mapbox://styles/mapbox/outdoors-v11"
          />
          <Select.Item
            label="mapbox://styles/mapbox/satellite-v9"
            value="mapbox://styles/mapbox/satellite-v9"
          />
          <Select.Item
            label="mapbox://styles/mapbox/satellite-streets-v11"
            value="mapbox://styles/mapbox/satellite-streets-v11"
          />
          <Select.Item
            label="mapbox://styles/mapbox/streets-v11"
            value="mapbox://styles/mapbox/streets-v11"
          />
        </Select>
      )}
      {!mapFullscreen ? (
        <View style={[previewMapDiemension, { alignSelf: "center" }]}>
          <MapView.MapView
            ref={mapViewRef}
            style={{ flex: 1, borderRadius: 15, overflow: "hidden" }}
            styleURL={style}
            zoomLevel={zoomLevel ? zoomLevel - 0.8 : 10}
            centerCoordinate={trailCenterPoint ? trailCenterPoint : null}
            onDidFinishRenderingMapFully={onMapLoaded}
            compassEnabled={false}
            logoEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Camera
              zoomLevel={zoomLevel ? zoomLevel - 0.8 : 10}
              centerCoordinate={trailCenterPoint ? trailCenterPoint : null}
              animationMode={"flyTo"}
              animationDuration={2000}
            />
            {/* // user location */}
            <MapView.PointAnnotation
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
            </MapView.PointAnnotation>
            {/* trail */}
            <MapView.ShapeSource
              id="source1"
              lineMetrics={true}
              shape={shape.features[0]}
              cluster
              clusterRadius={80}
              clusterMaxZoomLevel={14}
              style={{ zIndex: 1 }}
            >
              <MapView.LineLayer id="layer1" style={styles.lineLayer} />
            </MapView.ShapeSource>
            {/* // top location */}
            {shape?.features[0]?.geometry?.coordinates?.length > 0 && (
              <MapView.PointAnnotation
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
              </MapView.PointAnnotation>
            )}
          </MapView.MapView>
          {/* to come in fullscreen btn which is absolute */}
          <TouchableOpacity
            style={[
              styles.headerBtnView,
              {
                width: 40,
                height: 40,
                position: "absolute",
                bottom: 10,
                right: 10,
              },
            ]}
            onPress={() => changeMapStyle()}
          >
            <Entypo name="resize-full-screen" size={21} color={"grey"} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={fullMapDiemention}>
            <MapView.MapView
              key={zoomLevel}
              ref={mapViewFullScreenRef}
              style={{ flex: 1 }}
              styleURL={style}
              zoomLevel={zoomLevel ? zoomLevel : 12}
              centerCoordinate={trailCenterPoint ? trailCenterPoint : null}
              onDidFinishLoadingMap={onMapLoaded}
              compassEnabled={false}
              logoEnabled={false}
              zoomEnabled={true}
              onPress={onMapPress}
            >
              <MapView.Camera
                key={zoomLevel + 1}
                ref={camera}
                zoomLevel={zoomLevel ? zoomLevel : 12}
                centerCoordinate={trailCenterPoint ? trailCenterPoint : null}
                animationMode={"flyTo"}
                animationDuration={2000}
              />
              {/* // user location */}
              <MapView.PointAnnotation
                id={"1212"}
                coordinate={[location?.latitude, location.longitude]}
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
              </MapView.PointAnnotation>
              {/* trail */}
              <MapView.ShapeSource
                id="source1"
                lineMetrics={true}
                shape={shape?.features[0]}
                cluster
                clusterRadius={80}
                clusterMaxZoomLevel={14}
              >
                <MapView.LineLayer
                  id="layer1"
                  style={styles.lineLayer}
                  lineDasharray={[1, 2]} // set the dash array pattern here
                  lineDashOffset={0}
                />
              </MapView.ShapeSource>
              {/* // top location */}
              {shape?.features[0]?.geometry?.coordinates?.length > 0 && (
                <MapView.PointAnnotation
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
                </MapView.PointAnnotation>
              )}
            </MapView.MapView>
            {/* to come in fullscreen btn which is absolute */}
            <TouchableOpacity
              style={[
                styles.headerBtnView,
                {
                  width: 45,
                  height: 45,
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                },
              ]}
              onPress={() => {
                Alert.alert("Sorry, currently not implemented");
              }}
            >
              <MaterialCommunityIcons
                name="navigation-variant-outline"
                size={25}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.headerBtnView,
              {
                flexDirection: "row",
                width: "88%",
                height: 46,
                marginVertical: 10,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "green",
              },
            ]}
            onPress={() => onDownload()}
            disabled={downloading}
          >
            <Text style={{ fontSize: 16, color: "white" }}>
              {downloading ? "Downloading" : "Download Map"}
            </Text>
            {downloading && (
              <Text
                style={{
                  backgroundColor: "white",
                  color: "blue",
                  paddingHorizontal: 3,
                  marginHorizontal: 7,
                  minWidth: 20,
                }}
              >
                {progress}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
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

export default CustomizedMap;