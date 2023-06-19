import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "@env";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
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
    // if (map.current) return; // Initialize map only once

    let processedShape = processShapeData(shape);

    console.log("processedShape", processedShape);
    console.log("shape", shape);

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      // center: [lng, lat],
      center: trailCenterPointRef.current ? trailCenterPointRef.current : [lng, lat],
      zoom: zoomLevelRef.current ? zoomLevelRef.current : zoomLevel,
      cooperativeGestures: true
    });

    // Add geolocate control to the map.
    mapInstance.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    );

    mapInstance.addControl(new mapboxgl.FullscreenControl());

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

  return (
    <View style={styles.container}>
      <View key="map" ref={mapContainer} style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    width: "100%",
    borderRadius: '10px',
  },
  map: {
    width: "100%",
    minHeight: "400px", // Adjust the height to your needs
  },
});

export default WebMap;
