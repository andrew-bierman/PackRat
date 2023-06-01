import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "@env";
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
import * as Location from "expo-location";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

import {
  getShapeSourceBounds,
  handleShapeSourceLoad,
  latRad,
  zoom,
  calculateZoomLevel,
  findTrailCenter,
  processShapeData,
} from "../../utils/mapFunctions";

// import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const WebMap = ({
  shape = {
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
  },
}) => {
  useEffect(() => {
    // temporary solution to fix mapbox-gl-js missing css error
    if (Platform.OS === "web") {
      // inject mapbox css into head
      const link = document.createElement("link");
      link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // inject mapbox js into head
      const script = document.createElement("script");
      script.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-77.0369);
  const [lat, setLat] = useState(38.9072);

  // consts
  const dw = Dimensions.get("screen").width;
  const dh = Dimensions.get("screen").height;
  const fullMapDiemention = { width: dw, height: 360 };
  const previewMapDiemension = { width: dw * 0.9, height: 220 };

  const [getLocationLoading, setGetLocationLoading] = useState(false);
  const [correctLocation, setCorrectLocation] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(10);
  const [trailCenterPoint, setTrailCenterPoint] = useState(null);
  const zoomLevelRef = useRef(10);
  const trailCenterPointRef = useRef(null);

  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  // useEffect(() => {
  //   console.log("trailCenterPoint state", trailCenterPoint);
  //   console.log("zoomLevel state -- ", zoomLevel);
  //   console.log("trailCenterPointRef", trailCenterPointRef.current);
  // }, [trailCenterPoint, zoomLevel]);


  useEffect(() => {
    if (map.current) return; // Initialize map only once

    if (shape?.features[0]?.geometry?.coordinates?.length > 1) {
      let bounds = getShapeSourceBounds(shape);
      bounds = bounds[0].concat(bounds[1]);

      const mapDim = fullMapDiemention;

      const latZoom = calculateZoomLevel(bounds, mapDim);
      const trailCenter = findTrailCenter(shape);

      zoomLevelRef.current = latZoom;
      trailCenterPointRef.current = trailCenter;
    }
  }, [shape, fullMapDiemention]);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    let processedShape = processShapeData(shape);

    console.log("processedShape", processedShape);
    console.log("shape", shape);

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      // center: [lng, lat],
      center: trailCenterPointRef.current
        ? trailCenterPointRef.current
        : [lng, lat],
      zoom: zoomLevelRef.current ? zoomLevelRef.current : zoomLevel,
    });

    mapInstance.on("load", () => {
      mapInstance.addSource("trail", {
        type: "geojson",
        data: processedShape ? processedShape : shape,
      });

      mapInstance.addLayer({
        id: "trail",
        type: "line",
        source: "trail",
        paint: {
          "line-color": "#16b22d",
          "line-width": 4, // Modify this value to set the desired line thickness,
          "line-opacity": 1,
        },
      });

      // Add circle cap to the line ends
      mapInstance.addLayer({
        id: "trail-cap",
        type: "circle",
        source: "trail",
        paint: {
          "circle-radius": 6,
          "circle-color": "#16b22d",
        },
        filter: ["==", "meta", "end"],
      });

      // const marker = new mapboxgl.Marker()
      //   .setLngLat([lng, lat])
      //   .addTo(mapInstance);

      mapInstance.on("move", () => {
        const { lng, lat } = mapInstance.getCenter();
        setLng(lng.toFixed(4));
        setLat(lat.toFixed(4));
        setZoomLevel(mapInstance.getZoom().toFixed(2));
      });

      map.current = mapInstance;
    });

    console.log("mapInstance", mapInstance);

    return () => {
      // mapInstance.remove();
    };
  }, []);

  const getPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          ...location,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
        setCorrectLocation(true);
      } else {
        setCorrectLocation(false);
        Alert.alert("Permission denied");
      }
    } catch (error) {
      setCorrectLocation(false);
      Alert.alert("Something went wrong with location", error.message);
    }
  };

  const goToMyLocation = async () => {
    setGetLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          ...location,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
        setCorrectLocation(true);
      } else {
        setCorrectLocation(false);
        Alert.alert("Permission denied");
      }
    } catch (error) {
      if (!mountedRef.current) return null;
      setCorrectLocation(false);
      Alert.alert("Something went wrong with current location", error.message);
    }
  };

  const changeMapStyle = () => {
    setMapFullscreen(true);
    handleShapeSourceLoad({ width: dw, height: 360 });
  };

  const mapButtonsOverlay = () => (
    <View>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={goToMyLocation}
        disabled={getLocationLoading}
      >
        {getLocationLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <MaterialCommunityIcons name="crosshairs" size={24} color="white" />
        )}
      </TouchableOpacity>

      {!mapFullscreen ? (
        // Preview map
        <View style={[previewMapDiemension, { alignSelf: "center" }]}>
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
            onPress={changeMapStyle}
          >
            <Entypo name="resize-full-screen" size={21} color={"grey"} />
          </TouchableOpacity>
        </View>
      ) : (
        // Fullscreen map
        <View>
          <View style={fullMapDiemention}>{/* ... existing code ... */}</View>
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
            onPress={onDownload}
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

  return (
    <View style={styles.container}>
      {/* {mapButtonsOverlay()} */}
      <View key="map" ref={mapContainer} style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  map: {
    width: "100%",
    minHeight: "100vh", // Adjust the height to your needs
  },
  locationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
});

export default WebMap;
