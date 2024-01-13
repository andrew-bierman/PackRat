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
} from 'app/utils/mapFunctions';
import { saveFile } from 'app/utils/fileSaver/fileSaver.web';

export const useWebMap = ({ shape: shapeProp }) => {
  // useEffect(() => {
  //   // temporary solution to fix mapbox-gl-js missing css error
  //   if (Platform.OS === 'web') {
  //     // inject mapbox css into head
  //     const link = document.createElement('link');
  //     link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
  //     link.rel = 'stylesheet';
  //     document.head.appendChild(link);

  //     // inject mapbox js into head
  //     const script = document.createElement('script');
  //     script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
  //     script.async = true;
  //     document.head.appendChild(script);
  //   }
  // }, []);

  const [shape, setShape] = useState(shapeProp);
  console.log('WebMap shape', shape);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-77.0369);
  const [lat, setLat] = useState(38.9072);

  // consts
  const dw = Dimensions.get('screen').width;
  const dh = Dimensions.get('screen').height;
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
  const [downloadable, setDownloadable] = useState(false);

  useEffect(() => {
    // update the shape state when a new shapeProp gets passed
    if (shapeProp !== shape) setShape(shapeProp);
  }, [shapeProp]);

  useEffect(() => {
    if (shape?.features[0]?.geometry?.coordinates?.length >= 1) {
      let bounds = getShapeSourceBounds(shape);
      bounds = bounds[0].concat(bounds[1]);

      const mapDim = fullMapDiemention;

      const latZoom = calculateZoomLevel(bounds, mapDim);
      const trailCenter = findTrailCenter(shape);
      console.log('trailCenter in useEffect', trailCenter);

      zoomLevelRef.current = latZoom;
      trailCenterPointRef.current = trailCenter;

      setDownloadable(isShapeDownloadable(shape));
    }
  }, [shape, fullMapDiemention]);

  useEffect(() => {
    console.log(
      !mapFullscreen || !isPolygonOrMultiPolygon(shape),
      'is polygon or not',
    );
    if (!mapFullscreen && !isPolygonOrMultiPolygon(shape)) return;
    if (!lng || !lat) return;
    try {
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

      mapInstance.on('load', () => {
        if (isPoint(shape)) {
          addPoints(mapInstance);
        } else if (isPolygonOrMultiPolygon(shape)) {
          console.log('it is polygon');
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

        // const marker = new mapboxgl.Marker()
        //   .setLngLat([lng, lat])
        //   .addTo(mapInstance);

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
  }, [mapFullscreen]);

  useEffect(() => {
    if (map.current && isPoint(shape)) {
      addPoints(map.current);
    } else if (map.current && shape.features[0].geometry.type !== 'Point') {
      removeTrailLayer(map.current);
      addTrailLayer(map.current);
      map.current.setCenter(trailCenterPointRef.current);
      map.current.setZoom(zoomLevelRef.current);
    }

    console.log('trailCenterPointRef.current', trailCenterPointRef.current);

    // console.log("mapInstance", mapInstance);
  }, [shape]);

  /**
   * Removes the existing source and layers for the trail-cap and trail from the map instance.
   *
   * @param {object} mapInstance - The map instance to remove the layers and source from.
   */
  const removeTrailLayer = (mapInstance) => {
    // Remove existing source and layers if they exist
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

  /**
   * Adds a trail layer to the given map instance.
   *
   * @param {Object} mapInstance - The map instance to add the trail layer to.
   */
  const addTrailLayer = (mapInstance) => {
    const processedShape = processShapeData(shape);

    // Add new source and layers
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

    // Add circle cap to the line ends
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

  /**
   * Adds points to the map instance.
   *
   * @param {type} mapInstance - The map instance to add points to.
   * @return {type} None
   */
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

  /**
   * Adds polygons to the map instance.
   *
   * @param {object} mapInstance - The map instance to add the polygons to.
   */
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
  /**
   * Fetches the GPX download and handles the download process.
   * This function sets the state of 'downloading' to true and then tries to fetch the GPX data
   * using the provided shape and options. After receiving the GPX data, it calls the 'handleGpxDownload'
   * function to handle the download. If there is an error during the process, it logs the error to the console.
   *
   * @return {Promise<void>} A promise that resolves when the GPX download is complete.
   */
  const fetchGpxDownload = async () => {
    setDownloading(true);

    try {
      const options = {
        creator: 'PackRat', // Hardcoded creator option
        metadata: {
          name: shape.name || '', // Extract name from geoJSON (if available)
          desc: shape.description || '', // Extract description from geoJSON (if available)
        },
        //   featureTitle: (properties) => properties.name || "", // Extract feature title from properties (if available)
        //   featureDescription: (properties) => properties.description || "", // Extract feature description from properties (if available)
      };
      const gpx = togpx(shape, options);

      await handleGpxDownload(gpx);

      setDownloading(false);
    } catch (error) {
      console.log('error', error);
      setDownloading(false);
    }
  };

  /**
   * Enables full screen mode.
   *
   * @return {void}
   */
  const enableFullScreen = () => {
    setMapFullscreen(true);
    setShowModal(true);
  };

  /**
   * Disable full screen.
   *
   * @return {undefined} No return value.
   */
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
        if (isPoint(shape)) {
          map.current.on('style.load', () => addPoints(map.current));
        } else if (isPolygonOrMultiPolygon) {
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

  /**
   * Updates the map style and mapbox style to the specified style.
   *
   * @param {style} style - The style to set for the map and mapbox.
   * @return {void} This function does not return a value.
   */
  const handleChangeMapStyle = (style) => {
    setMapStyle(style);
    setMapboxStyle(style);
  };

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

    // console.log()
    // if(type !== 'Point') {

    // } else {
    //   window.open(`https://maps.google.com?q=${lat},${lng}`);
    // }
  };

  /**
   * Handles the download of a GPX file.
   *
   * @param {Object} gpxData - The GPX data to be downloaded.
   * @param {string} [filename="trail"] - The name of the file to be downloaded.
   * @param {string} [extension="gpx"] - The extension of the file to be downloaded.
   * @return {Promise<void>} - A promise that resolves when the download is complete.
   */
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

  /**
   * Fetches the user's location and updates the map accordingly.
   *
   * @return {Promise<void>} A Promise that resolves when the location is fetched and the map is updated.
   */
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
          if (map.current.getLayer('user-location')) {
            map.current.removeLayer('user-location');
          }
          if (map.current.getSource('user-location')) {
            map.current.removeSource('user-location');
          }

          // Add new user location layer
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
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log(isPolygonOrMultiPolygon(shape) || showModal, 'polygon or not');
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
