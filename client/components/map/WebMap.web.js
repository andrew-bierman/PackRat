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
  Image,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

import {
  defaultShape,
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

const WebMap = ({ shape = { ...defaultShape } }) => {

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
      center: trailCenterPointRef.current ? trailCenterPointRef.current : [lng, lat],
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
        setLng(location.coords.longitude)
        setLat(location.coords.latitude)
        setGetLocationLoading(false)
      } else {
        setGetLocationLoading(false)
        Alert.alert("Permission denied");
      }
    } catch (error) {
      setGetLocationLoading(false)
      if (!mountedRef.current) return null;
      Alert.alert("Something went wrong with current location", error.message);
    }
  };

  const changeMapStyle = () => {
    setMapFullscreen(true);
    handleShapeSourceLoad({ defaultShape, width: dw, height: 360 });
  };

  const mapButtonsOverlay = () => (
    <>
      <TouchableOpacity
        style={[styles.headerBtnView, styles.locationButton]}
        onPress={goToMyLocation}
        disabled={getLocationLoading}
      >
        {
          getLocationLoading
            ? (<ActivityIndicator size="small" color="grey" />)
            : (<MaterialCommunityIcons name="crosshairs" size={21} color="grey" />)
        }
      </TouchableOpacity>

      {!mapFullscreen ? (
        // Preview map
        <TouchableOpacity
          style={[styles.headerBtnView, styles.previewBtn]}
          onPress={changeMapStyle}
        >
          <Entypo name="resize-full-screen" size={21} color={"grey"} />
        </TouchableOpacity>
      ) : (
        // Fullscreen map
        <TouchableOpacity
          style={[styles.headerBtnView, styles.fullScreen]}
          onPress={() => { }}
          disabled={downloading}
        >
          <Image style={{ width: 21, height: 21 }} source={require('../../assets/download.svg')} />
          <Text style={{ fontSize: 13, fontWeight: '500', marginLeft: 8 }}>
            {downloading ? "Downloading" : "Download map"}
          </Text>
          {/* {downloading && (
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
        )} */}
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <View key="map" ref={mapContainer} style={styles.map} />
      {mapButtonsOverlay()}

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
    width: 40, height: 40,
    position: "absolute",
    bottom: 60, right: 10,
    backgroundColor: "white",
    borderRadius: 30,
    zIndex: 1,
  },
  headerBtnView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
  },
  previewBtn: {
    width: 40, height: 40,
    position: "absolute",
    bottom: 10, right: 10,
  },
  fullScreen: {
    width: "25%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#EBEDFD",
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default WebMap;
