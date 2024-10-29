import { offlineManager } from '@rnmapbox/maps';
import { type OfflineCreatePackOptionsArgs } from '@rnmapbox/maps/lib/typescript/src/modules/offline/OfflineCreatePackOptions';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useDownloadMapProgress = (onDownloadEnd?: () => void) => {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const onDownloadProgress = (offlineRegion: any, offlineRegionStatus: any) => {
    setProgress(offlineRegionStatus.percentage);
    setDownloading(true);
    if (offlineRegionStatus.percentage === 100) {
      Alert.alert('Map download successfully!');
      onDownloadEnd?.();
      setDownloading(false);
    }
  };

  const errorListener = (offlineRegion: any, error: any) => {
    Alert.alert(error.message);
  };

  const downloadMap = async (
    optionsForDownload: OfflineCreatePackOptionsArgs,
  ) => {
    offlineManager
      .createPack(optionsForDownload, onDownloadProgress, errorListener)
      .catch((error: any) => {
        Alert.alert(error.message);
      });
  };

  return { progress, isDownloading: downloading, downloadMap };
};
