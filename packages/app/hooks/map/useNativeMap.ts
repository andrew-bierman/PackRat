import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { offlineManager } from '@rnmapbox/maps';
import { Dimensions } from 'react-native';

import {
  calculateZoomLevel,
  findTrailCenter,
  getShapeSourceBounds,
  mapboxStyles,
} from '../../utils/mapFunctions';

export const useNativeMap = ({ shape: shapeProp }) => {
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
  const [trailCenterPoint, setTrailCenterPoint] = useState(
    findTrailCenter(shape),
  );

  const dw = Dimensions.get('screen').width;
  const fullMapDimension = { width: dw || '100%', height: '100%' };
  const previewMapStyle = {
    width: dw * 0.9,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  };

  // consts
  let bounds = getShapeSourceBounds(shape);
  // console.log("🚀 ~ file: NativeMap.native.js:99 ~ NativeMap ~ bounds:", bounds)
  bounds = bounds[0].concat(bounds[1]);
  const zoomLevel = calculateZoomLevel(bounds, { width: dw, height: 360 });
  // 
  // 

  // effects
  useEffect(() => {
    // update the shape state when a new shapeProp gets passed
    if (shapeProp !== shape) setShape(shapeProp);
  }, [shapeProp]);

  useEffect(() => {
    // update mapName & calculate new trailCenter whenever shape changes e.g newly passed shapeProp or new shape from gpx upload
    setMapName(shape?.features[0]?.properties?.name);
    setTrailCenterPoint(findTrailCenter(shape));
  }, [shape]);

  /**
   * Retrieves the current position using Geolocation API and updates the location state.
   *
   * @param {function} onSucccess - a callback function to be executed on success
   * @return {undefined} This function does not return anything
   */
  const getPosition = (onSucccess) => {
    Geolocation.getCurrentPosition(
      (data) => {
        setLocation({
          ...location,
          longitude: Number(data.coords.longitude),
          latitude: Number(data.coords.latitude),
        });
        setCorrectLocation(true);
        onSucccess?.(location);
      },
      (error) => {
        setCorrectLocation(false);
        Alert.alert('Something went wrong with location', error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  };

  /**
   * Handles the press event on the map.
   *
   * @param {Event} event - The press event object.
   */
  function onMapPress(event) {
    
    // if (trailCenterPoint) {
    //   mapViewFullScreenRef?.current.setCamera({
    //     centerCoordinate: trailCenterPoint,
    //   });
    // }
  }

  /**
   * Handles the download progress of an offline region.
   *
   * @param {Object} offlineRegion - The offline region being downloaded.
   * @param {Object} offlineRegionStatus - The status of the offline region download.
   * @returns {void}
   */
  function onDownloadProgress(offlineRegion, offlineRegionStatus) {
    
    setProgress(offlineRegionStatus.percentage);
    setDownloading(true);
    if (offlineRegionStatus.percentage == 100) {
      Alert.alert('Map download successfully!');
      setDownloading(false);
    }
  }
  /**
   * A function that serves as an error listener for the offline region.
   *
   * @param {Object} offlineRegion - The offline region object.
   * @param {Object} error - The error object.
   */
  function errorListener(offlineRegion, error) {
    Alert.alert(error.message);
  }
  /**
   * Downloads a file using the provided options.
   *
   * @param {object} optionsForDownload - The options for the download.
   * @return {Promise} A promise that resolves when the download is complete.
   */
  async function onDownload(optionsForDownload) {
    // start download
    offlineManager
      .createPack(optionsForDownload, onDownloadProgress, errorListener)
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  return {
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
    mapName,
    setMapName,
    trailCenterPoint,
    setTrailCenterPoint,
    zoomLevel,
    getPosition,
    onDownload,
    fullMapDimension,
    previewMapStyle,
    onMapPress,
  };
};
