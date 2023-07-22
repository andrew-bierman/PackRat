import React, { useRef, useState, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { convertGeoJSONToGPX } from "../../store/gpxStore";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from "react-native";
import {
  defaultShape,
  getShapeSourceBounds,
  calculateZoomLevel,
  findTrailCenter,
  processShapeData,
  mapboxStyles,
  getLocation,
  isShapeDownloadable,
  handleGpxDownload,
} from "../../utils/mapFunctions";
import MapButtonsOverlay from "./MapButtonsOverlay";

// import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const WebMap = ({ shape = { ...defaultShape } }) => {
  console.log("WebMap shape", shape);
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

  const [zoomLevel, setZoomLevel] = useState(10);
  const [trailCenterPoint, setTrailCenterPoint] = useState(null);
  const zoomLevelRef = useRef(10);
  const trailCenterPointRef = useRef(null);

  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [mapStyle, setMapStyle] = useState(mapboxStyles[0].style);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [userLng, setUserLng] = useState(null);
  const [userLat, setUserLat] = useState(null);

  // download variables
  const dispatch = useDispatch();
  const gpxData = useSelector((state) => state.gpx.gpxData);
  const [downloadable, setDownloadable] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    if (shape?.features[0]?.geometry?.coordinates?.length > 1) {
      let bounds = getShapeSourceBounds(shape);
      bounds = bounds[0].concat(bounds[1]);

      const mapDim = fullMapDiemention;

      const latZoom = calculateZoomLevel(bounds, mapDim);
      const trailCenter = findTrailCenter(shape);
      console.log("trailCenter in useEffect", trailCenter);

      zoomLevelRef.current = latZoom;
      trailCenterPointRef.current = trailCenter;

      setDownloadable(isShapeDownloadable(shape));
    }
  }, [shape, fullMapDiemention]);

  useEffect(() => {
    // if (map.current) return; // Initialize map only once

    let processedShape = processShapeData(shape);

    console.log("processedShape", processedShape);
    console.log("shape", shape);

    console.log("trailCenterPointRef.current", trailCenterPointRef.current);

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      // center: [lng, lat],
      center:
        trailCenterPointRef.current &&
        !isNaN(trailCenterPointRef.current[0]) &&
        !isNaN(trailCenterPointRef.current[1])
          ? trailCenterPointRef.current
          : [lng, lat],
      zoom: zoomLevelRef.current ? zoomLevelRef.current : zoomLevel,
      interactive: mapFullscreen,
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

      if (mapFullscreen && showUserLocation) {
        mapInstance.addLayer({
          id: "user-location",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Point",
              coordinates: [lng, lat],
            },
          },
          paint: {
            "circle-radius": 8,
            "circle-color": "#3388ff",
          },
        });
      }

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

    // console.log("mapInstance", mapInstance);

    return () => {
      // mapInstance.remove();
    };
  }, [mapFullscreen]);

  const addTrailLayer = (mapInstance) => {
    let processedShape = processShapeData(shape);

    // Remove existing source and layers if they exist
    if (mapInstance.getLayer("trail-cap")) {
      mapInstance.removeLayer("trail-cap");
    }

    if (mapInstance.getSource("trail-cap")) {
      mapInstance.removeSource("trail-cap");
    }

    if (mapInstance.getLayer("trail")) {
      mapInstance.removeLayer("trail");
    }

    if (mapInstance.getSource("trail")) {
      mapInstance.removeSource("trail");
    }

    // Add new source and layers
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
        "line-width": 4,
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
  };

  const fetchGpxDownload = async () => {
    setDownloading(true);

    console.log("gpxData at start of fetchGpxDownload", gpxData);

    try {
      const updatedGpxData = await dispatch(convertGeoJSONToGPX(shape));

      const { payload } = updatedGpxData;

      await handleGpxDownload(payload);

      setDownloading(false);
    } catch (error) {
      console.log("error", error);
      setDownloading(false);
    }
  };

  const enableFullScreen = () => {
    setMapFullscreen(true);
    setShowModal(true);
  };

  const disableFullScreen = () => {
    setMapFullscreen(false);
    setShowModal(false);
  };

  const setMapboxStyle = useCallback(
    (style) => {
      if (map.current) {
        // Step 1: remove sources, layers, etc.
        if (map.current.getLayer("trail-cap")) {
          map.current.removeLayer("trail-cap");
        }
        if (map.current.getSource("trail-cap")) {
          map.current.removeSource("trail-cap");
        }
        if (map.current.getLayer("trail")) {
          map.current.removeLayer("trail");
        }
        if (map.current.getSource("trail")) {
          map.current.removeSource("trail");
        }

        // Step 2: change the style
        map.current.setStyle(style);

        // Step 3: add the sources, layers, etc. back once the style has loaded
        map.current.on("style.load", () => addTrailLayer(map.current));
      }
    },
    [addTrailLayer]
  );

  const handleChangeMapStyle = (style) => {
    setMapStyle(style);
    setMapboxStyle(style);
  };

  const fetchLocation = async () => {
    try {
      const location = await getLocation();

      if (location) {
        const { latitude, longitude } = location.coords;
        setUserLng(longitude);
        setUserLat(latitude);
        setShowUserLocation(true);

        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
          });

          // Remove existing user location layer if it exists
          if (map.current.getLayer("user-location")) {
            map.current.removeLayer("user-location");
          }
          if (map.current.getSource("user-location")) {
            map.current.removeSource("user-location");
          }

          // Add new user location layer
          map.current.addLayer({
            id: "user-location",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "Point",
                coordinates: [userLng, userLat],
              },
            },
            paint: {
              "circle-radius": 8,
              "circle-color": "#3388ff",
            },
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const component = (
    <View style={[styles.container, { height: showModal ? "100%" : "400px" }]}>
      <View key="map" ref={mapContainer} style={styles.map} />
      {/* <MapButtons /> */}
      
      <MapButtonsOverlay
        mapFullscreen={mapFullscreen}
        enableFullScreen={enableFullScreen}
        disableFullScreen={disableFullScreen}
        handleChangeMapStyle={handleChangeMapStyle}
        fetchLocation={fetchLocation}
        styles={styles}
        downloadable={downloadable}
        downloading={downloading}
        onDownload={fetchGpxDownload}
        shape={shape}
      />
    </View>
  );

  return showModal ? (
    <Modal animationType={"fade"} transparent={false} visible={true}>
      {component}
    </Modal>
  ) : (
    component
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: "10px",
  },
  map: {
    width: "100%",
    minHeight: "100vh", // Adjust the height to your needs
  },
  modal: {
    alignItems: "center",
  },
});

export default WebMap;
