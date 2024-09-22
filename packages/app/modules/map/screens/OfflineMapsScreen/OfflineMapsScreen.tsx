import { Text, View } from 'react-native';
import { offlineManager } from '@rnmapbox/maps';
import React, { useState, useMemo, useEffect } from 'react';
import useTheme from 'app/hooks/useTheme';
import { RScrollView, RStack } from '@packrat/ui';
import type OfflinePack from '@rnmapbox/maps/lib/typescript/src/modules/offline/OfflinePack';
import { MapPreviewCard } from 'app/modules/map/components';
import { Map } from 'app/modules/map';
import { useOfflineMaps } from '../../hooks/useOfflineMaps';

interface OfflineMap {
  name: string;
  styleURL: string;
  bounds: [number[], number[]];
  minZoom: number;
  maxZoom: number;
  downloaded: boolean;
  metadata: {
    shape: unknown;
  };
}

export const OfflineMapsScreen = () => {
  const [selectedMapId, setSelectedMapId] = useState('');
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const { data } = useOfflineMaps();
  const offlineMaps = useOfflineMapWithDownloadStatus(data);
  const selectedMap = useMemo(() => {
    return offlineMaps?.find?.((map) => map?.id === selectedMapId);
  }, [offlineMaps, selectedMapId]);

  return (
    <View
      style={{
        backgroundColor: currentTheme.colors.background,
        height: '100%',
      }}
    >
      {selectedMap?.metadata?.shape ? (
        <Map
          shape={selectedMap.metadata.shape}
          shouldEnableDownload={!selectedMap.downloaded}
          onExitFullScreen={() => setSelectedMapId('')}
          initialBounds={selectedMap.bounds}
          isFullScreenModeByDefault
        />
      ) : null}
      <RScrollView nestedScrollEnabled={true} mt={50} mb={50}>
        {offlineMaps ? (
          <RStack
            direction="horizontal"
            space={16}
            style={{
              paddingHorizontal: 16,
              paddingBottom: 20,
              alignItems: 'center',
            }}
          >
            {offlineMaps.map((offlineMap) => {
              // const center = getCenterCoordinates(offlineMap.bounds);
              return (
                <View style={{ maxWidth: 300 }} key={offlineMap.id}>
                  <MapPreviewCard
                    id={offlineMap.id}
                    onShowMapClick={setSelectedMapId}
                    title={offlineMap.name}
                    isDownloaded={offlineMap.downloaded}
                  />
                </View>
              );
            })}
          </RStack>
        ) : (
          <RStack>
            <Text>loading...</Text>
          </RStack>
        )}
      </RScrollView>
    </View>
  );
};

const useOfflineMapWithDownloadStatus = (offlineMaps) => {
  const [offlineMapsWithDownloadStatus, setOfflineMapWithDownloadStatus] =
    useState([]);

  useEffect(() => {
    (async () => {
      const res = await addDownloadStatusToMaps(offlineMaps);
      setOfflineMapWithDownloadStatus(res);
    })();
  }, [offlineMaps]);

  return offlineMapsWithDownloadStatus;
};

const addDownloadStatusToMaps = async (offlineMaps: OfflineMap[]) => {
  const offlineMapboxPacks: OfflineMap[] = [];
  for (const map of offlineMaps) {
    const offlineMap: OfflineMap = {
      styleURL: `${map.styleURL}`,
      name: `${map.name}`,
      minZoom: map.minZoom,
      maxZoom: map.maxZoom,
      bounds: map.bounds,
      metadata: {
        shape: JSON.parse(map.metadata.shape as string),
      },
      downloaded: false,
    };

    let offlineMapboxPack: OfflinePack | null;
    try {
      offlineMapboxPack = await offlineManager.getPack(map.name);
    } catch (error) {
      offlineMapboxPack = null;
    }

    if (offlineMapboxPack) {
      offlineMap.downloaded = true;
    }

    offlineMapboxPacks.push(offlineMap);
  }
  return offlineMapboxPacks;
};
