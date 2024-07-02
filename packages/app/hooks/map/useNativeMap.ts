import Geolocation from '@react-native-community/geolocation';
import { offlineManager } from '@rnmapbox/maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import {
  calculateZoomLevel,
  findTrailCenter,
  getShapeSourceBounds,
  mapboxStyles,
  validateShape,
} from '../../utils/mapFunctions';

interface Location {
  longitude: number;
  latitude: number;
}

interface Shape {
  features: Array<{ properties: { name: string } }>;
}

interface UseNativeMapProps {
  shape: Shape;
}

const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    longitude: 0.0,
    latitude: 0.0,
  });

  const getPosition = useCallback((onSuccess: (location: Location) => void) => {
    Geolocation.getCurrentPosition(
      (data) => {
        const newLocation = {
          longitude: Number(data.coords.longitude),
          latitude: Number(data.coords.latitude),
        };
        setLocation(newLocation);
        onSuccess?.(newLocation);
      },
      (error) => {
        Alert.alert('Something went wrong with location', error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  return { location, getPosition };
};

const useMapStyles = () => {
  const [mapStyle, setMapStyle] = useState(mapboxStyles[0]?.style ?? '');

  return { mapStyle, setMapStyle };
};

const useDownloadProgress = () => {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const onDownloadProgress = (offlineRegion: any, offlineRegionStatus: any) => {
    setProgress(offlineRegionStatus.percentage);
    setDownloading(true);
    if (offlineRegionStatus.percentage === 100) {
      Alert.alert('Map download successfully!');
      setDownloading(false);
    }
  };

  const errorListener = (offlineRegion: any, error: any) => {
    Alert.alert(error.message);
  };

  const onDownload = async (optionsForDownload: any) => {
    offlineManager
      .createPack(optionsForDownload, onDownloadProgress, errorListener)
      .catch((error: any) => {
        Alert.alert(error.message);
      });
  };

  return { progress, downloading, onDownload };
};

const useMapDimensions = () => {
  const dw = Dimensions.get('screen').width;
  const fullMapDimension = { width: dw || '100%', height: '100%' };
  const previewMapStyle = {
    width: dw * 0.9,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  };

  return { fullMapDimension, previewMapStyle };
};

export const useNativeMap = ({ shape: shapeProp }: UseNativeMapProps) => {
  const camera = useRef(null);
  const mapViewRef = useRef(null);
  const cancelRef = useRef(null);

  const { location, getPosition } = useLocation();
  const { mapStyle, setMapStyle } = useMapStyles();
  const { progress, downloading, onDownload } = useDownloadProgress();
  const { fullMapDimension, previewMapStyle } = useMapDimensions();

  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [showMapNameInputDialog, setShowMapNameInputDialog] = useState(false);
  const [shape, setShape] = useState(shapeProp);
  const [mapName, setMapName] = useState(shape?.features[0]?.properties?.name);
  const [trailCenterPoint, setTrailCenterPoint] = useState(
    findTrailCenter(shape),
  );

  let bounds;
  try {
    validateShape(shape);
    bounds = getShapeSourceBounds(shape);
    if (bounds[0] && bounds[1]) {
      bounds = [bounds[0], bounds[1]];
    }
  } catch (error) {
    Alert.alert('Invalid Shape', error.message);
    bounds = [
      [0, 0],
      [0, 0],
    ]; // Fallback bounds
  }

  const zoomLevel = calculateZoomLevel(bounds, {
    width: Dimensions.get('screen').width,
    height: 360,
  });

  useEffect(() => {
    if (shapeProp !== shape) setShape(shapeProp);
  }, [shapeProp]);

  useEffect(() => {
    try {
      validateShape(shape);
      setMapName(shape?.features[0]?.properties?.name);
      setTrailCenterPoint(findTrailCenter(shape));
    } catch (error) {
      Alert.alert('Invalid Shape', error.message);
    }
  }, [shape]);

  const onMapPress = (event: any) => {
    // if (trailCenterPoint) {
    //   mapViewFullScreenRef?.current.setCamera({
    //     centerCoordinate: trailCenterPoint,
    //   });
    // }
  };

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
