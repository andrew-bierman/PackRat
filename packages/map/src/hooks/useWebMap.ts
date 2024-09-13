import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Dimensions } from 'react-native';
import mapboxgl from 'mapbox-gl';
import togpx from 'togpx';
import {
  calculateZoomLevel,
  findTrailCenter,
  getLocation,
  getShapeSourceBounds,
  isPoint,
  isPolygonOrMultiPolygon,
  isShapeDownloadable,
  mapboxStyles,
  multiPolygonBounds,
  processShapeData,
} from '../utils/mapFunctions';
import { saveFile } from '../utils/fileSaver/fileSaver.web';

// Hook to handle state management
const useMapState = (shapeProp) => {
  // State to store the shape data
  const [shape, setShape] = useState(shapeProp);
  // Refs for map container and instance
  const mapContainer = useRef(null);
  const map = useRef(null);
  // States for map coordinates and zoom level
  const [lng, setLng] = useState(-77.0369);
  const [lat, setLat] = useState(38.9072);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [trailCenterPoint, setTrailCenterPoint] = useState(null);
  const zoomLevelRef = useRef(10);
  const trailCenterPointRef = useRef(null);
  // States for UI and user interaction
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mapStyle, setMapStyle] = useState(
    mapboxStyles[0] ? mapboxStyles[0].style : '',
  );
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [userLng, setUserLng] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [downloadable, setDownloadable] = useState(false);

  // Dimensions for full and preview map
  const dw = Dimensions.get('screen').width;
  const fullMapDiemention = useMemo(() => ({ width: dw, height: 360 }), [dw]);
  const previewMapDiemension = { width: dw * 0.9, height: 220 };

  // Effect to update shape when shapeProp changes
  useEffect(() => {
    if (shapeProp !== shape) setShape(shapeProp);
  }, [shapeProp]);

  return {
    shape,
    setShape,
    mapContainer,
    map,
    lng,
    setLng,
    lat,
    setLat,
    zoomLevel,
    setZoomLevel,
    trailCenterPoint,
    setTrailCenterPoint,
    zoomLevelRef,
    trailCenterPointRef,
    mapFullscreen,
    setMapFullscreen,
    downloading,
    setDownloading,
    showModal,
    setShowModal,
    mapStyle,
    setMapStyle,
    showUserLocation,
    setShowUserLocation,
    userLng,
    setUserLng,
    userLat,
    setUserLat,
    downloadable,
    setDownloadable,
    fullMapDiemention,
    previewMapDiemension,
  };
};

// Hook to handle side effects
const useMapEffects = ({
  shape,
  map,
  mapContainer,
  mapStyle,
  setMapStyle,
  lng,
  lat,
  zoomLevel,
  zoomLevelRef,
  trailCenterPointRef,
  mapFullscreen,
  showUserLocation,
  setLng,
  setLat,
  setZoomLevel,
  setDownloadable,
  fullMapDiemention,
  addPoints,
  addPolygons,
  addTrailLayer,
  removeTrailLayer,
}) => {
  // Effect to handle shape data and calculate bounds
  useEffect(() => {
    if (shape?.features[0]?.geometry?.coordinates?.length >= 1) {
      let bounds = getShapeSourceBounds(shape);
      if (bounds[0] && bounds[1]) {
        bounds = [bounds[0], bounds[1]];
      }
      const mapDim = fullMapDiemention;
      const latZoom = calculateZoomLevel(bounds, mapDim);
      const trailCenter = findTrailCenter(shape);

      zoomLevelRef.current = latZoom;
      trailCenterPointRef.current = trailCenter;
      setDownloadable(isShapeDownloadable(shape));
    }
  }, [shape, fullMapDiemention]);

  // Effect to initialize and configure Mapbox map
  useEffect(() => {
    if (!mapFullscreen && !isPolygonOrMultiPolygon(shape)) return;
    if (!lng || !lat) return;
    try {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center:
          trailCenterPointRef.current &&
          !isNaN(trailCenterPointRef.current[0]) &&
          !isNaN(trailCenterPointRef.current[1])
            ? trailCenterPointRef.current
            : [lng, lat],
        zoom: zoomLevelRef.current ? zoomLevelRef.current : zoomLevel,
        interactive: mapFullscreen,
      });

      // Map load event handler
      mapInstance.on('load', () => {
        if (isPoint(shape)) {
          addPoints(mapInstance);
        } else if (isPolygonOrMultiPolygon(shape)) {
          addPolygons(mapInstance);
        } else {
          addTrailLayer(mapInstance);
        }
        if (mapFullscreen && showUserLocation) {
          mapInstance.addLayer({
            id: 'user-location',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'Point',
                coordinates: [lng, lat],
              },
            },
            paint: {
              'circle-radius': 8,
              'circle-color': '#3388ff',
            },
          });
        }

        // Map move event handler
        mapInstance.on('move', () => {
          const { lng, lat } = mapInstance.getCenter();
          setLng(lng.toFixed(4));
          setLat(lat.toFixed(4));
          setZoomLevel(mapInstance.getZoom().toFixed(2));
        });

        map.current = mapInstance;
      });
    } catch (error) {
      console.error(error);
    }
  }, [mapFullscreen, shape]);

  // Effect to handle shape changes and update map layers
  useEffect(() => {
    if (map.current && isPoint(shape)) {
      addPoints(map.current);
    } else if (map.current && !isPoint(shape)) {
      removeTrailLayer(map.current);
      addTrailLayer(map.current);
      map.current.setCenter(trailCenterPointRef.current);
      map.current.setZoom(zoomLevelRef.current);
    }
  }, [shape]);
};

// Hook to handle actions
const useMapActions = ({
  map,
  shape,
  mapStyle,
  setMapStyle,
  setDownloading,
  userLng,
  userLat,
  setUserLng,
  setUserLat,
  setShowUserLocation,
  setMapFullscreen,
  setShowModal,
}) => {
  // Function to remove trail layer from map
  const removeTrailLayer = (mapInstance) => {
    if (mapInstance.getLayer('trail-cap')) {
      mapInstance.removeLayer('trail-cap');
    }
    if (mapInstance.getSource('trail-cap')) {
      mapInstance.removeSource('trail-cap');
    }
    if (mapInstance.getLayer('trail')) {
      mapInstance.removeLayer('trail');
    }
    if (mapInstance.getSource('trail')) {
      mapInstance.removeSource('trail');
    }
  };

  // Function to add trail layer to map
  const addTrailLayer = (mapInstance) => {
    const processedShape = processShapeData(shape);
    mapInstance.addSource('trail', {
      type: 'geojson',
      data: processedShape || shape,
    });
    mapInstance.addLayer({
      id: 'trail',
      type: 'line',
      source: 'trail',
      paint: {
        'line-color': '#16b22d',
        'line-width': 4,
        'line-opacity': 1,
      },
    });
    mapInstance.addLayer({
      id: 'trail-cap',
      type: 'circle',
      source: 'trail',
      paint: {
        'circle-radius': 6,
        'circle-color': '#16b22d',
      },
      filter: ['==', 'meta', 'end'],
    });
  };

  // Function to add point markers to map
  const addPoints = (mapInstance) => {
    if (mapInstance) {
      const pointLatLong = shape?.features[0]?.geometry?.coordinates;
      if (pointLatLong && !isNaN(pointLatLong[0]) && !isNaN(pointLatLong[1])) {
        const [lng, lat] = pointLatLong;
        const marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapInstance);
        marker.getElement().addEventListener('click', () => {
          window.open(`https://maps.google.com?q=${lat},${lng}`);
        });
        mapInstance.setCenter(pointLatLong);
      } else {
        console.error('Invalid coordinates.');
      }
    }
  };

  // Function to add polygon layers to map
  const addPolygons = (mapInstance) => {
    if (mapInstance) {
      mapInstance.addLayer({
        id: 'polygon-layer',
        type: 'fill',
        source: {
          type: 'geojson',
          data: shape.features[0],
        },
        paint: {
          'fill-color': '#3388ff',
          'fill-opacity': 0.3,
        },
      });
      mapInstance.setCenter(multiPolygonBounds(shape.features[0]));
    }
  };

  // Function to fetch and download GPX file
  const fetchGpxDownload = async () => {
    setDownloading(true);
    try {
      const options = {
        creator: 'PackRat',
        metadata: {
          name: shape.name || '',
          desc: shape.description || '',
        },
      };
      const gpx = togpx(shape, options);
      await handleGpxDownload(gpx);
      setDownloading(false);
    } catch (error) {
      setDownloading(false);
    }
  };

  // Function to enable fullscreen mode
  const enableFullScreen = () => {
    setMapFullscreen(true);
    setShowModal(true);
  };

  // Function to disable fullscreen mode
  const disableFullScreen = () => {
    setMapFullscreen(false);
    setShowModal(false);
  };

  // Function to handle GPX file download
  const handleGpxDownload = async (
    gpxData,
    filename = shape?.features[0]?.properties?.name ?? 'trail',
    extension = 'gpx',
  ) => {
    if (gpxData) {
      const type = 'application/gpx+xml';
      await saveFile(gpxData, filename, extension, type);
    }
  };

  // Function to fetch user location
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
          if (map.current.getLayer('user-location')) {
            map.current.removeLayer('user-location');
          }
          if (map.current.getSource('user-location')) {
            map.current.removeSource('user-location');
          }
          map.current.addLayer({
            id: 'user-location',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'Point',
                coordinates: [userLng, userLat],
              },
            },
            paint: {
              'circle-radius': 8,
              'circle-color': '#3388ff',
            },
          });
        }
      }
    } catch (error) {}
  };

  // Function to open location in Google Maps
  const openMaps = () => {
    const pointLatLong = shape?.features[0]?.geometry?.coordinates;
    const { type } = shape.features[0].geometry;
    if (type !== 'Point') {
      const [latlng] = pointLatLong;
      window.open(`https://maps.google.com?q=${latlng[1]},${latlng[0]}`);
    } else {
      const [lng, lat] = pointLatLong;
      window.open(`https://maps.google.com?q=${lat},${lng}`);
    }
  };

  // Function to set Mapbox style
  const setMapboxStyle = useCallback(
    (style) => {
      if (map.current) {
        removeTrailLayer(map.current);
        map.current.setStyle(style);
        if (isPoint(shape)) {
          map.current.on('style.load', () => addPoints(map.current));
        } else if (isPolygonOrMultiPolygon(shape)) {
          // Add Polygon
        } else {
          map.current.on('style.load', () => {
            addTrailLayer(map.current);
          });
        }
      }
    },
    [addTrailLayer, removeTrailLayer],
  );

  // Function to change map style
  const handleChangeMapStyle = (style) => {
    setMapStyle(style);
    setMapboxStyle(style);
  };

  return {
    removeTrailLayer,
    addTrailLayer,
    addPoints,
    addPolygons,
    fetchGpxDownload,
    enableFullScreen,
    disableFullScreen,
    handleGpxDownload,
    fetchLocation,
    openMaps,
    setMapboxStyle,
    handleChangeMapStyle,
  };
};

// Main hook to combine state, effects, and actions
export const useWebMap = ({ shape: shapeProp }) => {
  // State management hook
  const {
    shape,
    setShape,
    mapContainer,
    map,
    lng,
    setLng,
    lat,
    setLat,
    zoomLevel,
    setZoomLevel,
    trailCenterPoint,
    setTrailCenterPoint,
    zoomLevelRef,
    trailCenterPointRef,
    mapFullscreen,
    setMapFullscreen,
    downloading,
    setDownloading,
    showModal,
    setShowModal,
    mapStyle,
    setMapStyle,
    showUserLocation,
    setShowUserLocation,
    userLng,
    setUserLng,
    userLat,
    setUserLat,
    downloadable,
    setDownloadable,
    fullMapDiemention,
    previewMapDiemension,
  } = useMapState(shapeProp);

  // Actions hook
  const {
    removeTrailLayer,
    addTrailLayer,
    addPoints,
    addPolygons,
    fetchGpxDownload,
    enableFullScreen,
    disableFullScreen,
    handleGpxDownload,
    fetchLocation,
    openMaps,
    setMapboxStyle,
    handleChangeMapStyle,
  } = useMapActions({
    map,
    shape,
    mapStyle,
    setMapStyle,
    setDownloading,
    userLng,
    userLat,
    setUserLng,
    setUserLat,
    setShowUserLocation,
    setMapFullscreen,
    setShowModal,
  });

  // Side effects hook
  useMapEffects({
    shape,
    map,
    mapContainer,
    mapStyle,
    setMapStyle,
    lng,
    lat,
    zoomLevel,
    zoomLevelRef,
    trailCenterPointRef,
    mapFullscreen,
    showUserLocation,
    setLng,
    setLat,
    setZoomLevel,
    setDownloadable,
    fullMapDiemention,
    addPoints,
    addPolygons,
    addTrailLayer,
    removeTrailLayer,
  });

  return {
    mapContainer,
    lng,
    lat,
    zoomLevel,
    mapFullscreen,
    downloading,
    showModal,
    mapStyle,
    showUserLocation,
    userLng,
    userLat,
    fetchGpxDownload,
    enableFullScreen,
    disableFullScreen,
    handleChangeMapStyle,
    openMaps,
    fetchLocation,
    downloadable,
    previewMapDiemension,
    fullMapDiemention,
    map,
    shape,
    setShape,
  };
};
