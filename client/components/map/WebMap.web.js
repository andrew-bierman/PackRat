import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "@env";
import { useSelector, useDispatch } from "react-redux";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Alert,
} from "react-native";
import {
  getShapeSourceBounds,
  calculateZoomLevel,
  findTrailCenter,
  processShapeData,
  mapboxStyles,
  getLocation,
  isShapeDownloadable,
  isPoint
} from "../../utils/mapFunctions";
import MapButtonsOverlay from "./MapButtonsOverlay";
import { saveFile } from "../../utils/fileSaver/fileSaver";
import * as DocumentPicker from "expo-document-picker";
import togpx from "togpx";
import { gpx as toGeoJSON } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";

// import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const DESTINATION = 'destination'
const TRIP= 'trip';
const WebMap = ({ shape: shapeProp, selectedSearchResult, type }) => {

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

  const [shape, setShape] = useState(shapeProp);
  console.log("WebMap shape", shape);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-77.0369);
  const [lat, setLat] = useState(38.9072);

  // consts
  const dw = Dimensions.get("screen").width;
  const dh = Dimensions.get("screen").height;
  const fullMapDiemention = useMemo(() => ({ width: dw, height: 360 }), [dw]);
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
  const [downloadable, setDownloadable] = useState(false);

  useEffect(() => {
    // update the shape state when a new shapeProp gets passed
    if (shapeProp !== shape) setShape(shapeProp);
  }, [shapeProp]);

  useEffect(() => {
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
      if(isPoint(shape)) {
        addPoints(mapInstance);
      } else {
        addTrailLayer(mapInstance);
      }
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
  }, [mapFullscreen]);

  useEffect(() => {
    if(map.current && isPoint(shape)) {
      addPoints(map.current);
    }
    else if (map.current && shape.features[0].geometry.type !== 'Point') {
      removeTrailLayer(map.current);
      addTrailLayer(map.current);
      map.current.setCenter(trailCenterPointRef.current);
      map.current.setZoom(zoomLevelRef.current);
    }

    console.log("trailCenterPointRef.current", trailCenterPointRef.current);

    // console.log("mapInstance", mapInstance);
  }, [shape, selectedSearchResult]);

  const removeTrailLayer = (mapInstance) => {
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
  };

  const addTrailLayer = (mapInstance) => {
    let processedShape = processShapeData(shape);

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


  const addPoints = (mapInstance) => {
      if(mapInstance) {
        const pointLatLong = shape?.features[0]?.geometry?.coordinates
        new mapboxgl.Marker().setLngLat([pointLatLong[0], pointLatLong[1]]).addTo(mapInstance);
        mapInstance.setCenter(pointLatLong);
      }
      }
  const fetchGpxDownload = async () => {
    setDownloading(true);

    try {
      const options = {
        creator: "PackRat", // Hardcoded creator option
        metadata: {
          name: shape.name || "", // Extract name from geoJSON (if available)
          desc: shape.description || "", // Extract description from geoJSON (if available)
        },
        //   featureTitle: (properties) => properties.name || "", // Extract feature title from properties (if available)
        //   featureDescription: (properties) => properties.description || "", // Extract feature description from properties (if available)
      };
      const gpx = togpx(shape, options);

      await handleGpxDownload(gpx);

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
        removeTrailLayer(map.current);

        // Step 2: change the style
        map.current.setStyle(style);

        // Step 3: add the sources, layers, etc. back once the style has loaded
        if(isPoint(shape)) {
          map.current.on('style.load', () => addPoints(map.current))
        } else   {
          map.current.on("style.load", () => addTrailLayer(map.current));
        }
      }
    },
    [addTrailLayer, removeTrailLayer]
  );

  const handleChangeMapStyle = (style) => {
    setMapStyle(style);
    setMapboxStyle(style);
  };

  const handleGpxDownload = async (
    gpxData,
    filename = shape?.features[0]?.properties?.name ?? "trail",
    extension = "gpx"
  ) => {
    if (gpxData) {
      const type = "application/gpx+xml";
      await saveFile(gpxData, filename, extension, type);
    }
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

  const element = (
    <View style={[styles.container, { height: showModal ? "100%" : "400px" }]}>
      <View key="map" ref={mapContainer} style={styles.map} />
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
        handleGpxUpload={async () => {
          console.log("clikedd");
          try {
            const result = await DocumentPicker.getDocumentAsync({
              type: "application/gpx+xml",
            });
            console.log("result", result);
            if (result.type === "success") {
              const base64Gpx = result.uri.split(",")[1];
              const gpxString = atob(base64Gpx);
              const parsedGpx = new DOMParser().parseFromString(gpxString);
              const geojson = toGeoJSON(parsedGpx);
              setShape(geojson);
            }
          } catch (err) {
            Alert.alert("An error occured");
          }
        }}
        shape={shape}
      />
    </View>
  );

  return showModal ? (
    <Modal animationType={"fade"} transparent={false} visible={true}>
      {element}
    </Modal>
  ) : (
    element
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
