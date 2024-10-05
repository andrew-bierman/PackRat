import { offlineManager } from '@rnmapbox/maps';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useDownloadMapProgress = () => {
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

  const downloadMap = async (optionsForDownload: any) => {
    offlineManager
      .createPack(optionsForDownload, onDownloadProgress, errorListener)
      .catch((error: any) => {
        Alert.alert(error.message);
      });
  };

  return { progress, isDownloading: downloading, downloadMap };
};
