import { Text, View } from 'react-native';
import { offlineManager } from '@rnmapbox/maps';
import React, {
  useState,
  useMemo,
  useCallback,
  type ReactNode,
  type FC,
} from 'react';
import useTheme from 'app/hooks/useTheme';
import { RScrollView, RStack } from '@packrat/ui';
import { MapPreviewCard } from 'app/modules/map/components/MapPreviewCard';
import { useOfflineMaps } from '../../hooks/useOfflineMaps';
import { OfflineMapComponent } from './OfflineMap';
import { useFocusEffect } from 'expo-router';
import { useAuthUser } from 'app/modules/auth';
import { OFFLINE_MAP_STYLE_URL } from 'app/modules/map/constants';
import { useOfflineStore } from 'app/atoms';

export interface OfflineMap {
  id: string;
  name: string;
  styleURL: string;
  userId: string;
  minZoom?: number;
  maxZoom?: number;
  bounds: [number[], number[]];
  downloaded: boolean;
}

interface OfflineMapScreenProps {
  fallback?: ReactNode;
}

export const OfflineMapsScreen: FC<OfflineMapScreenProps> = ({ fallback }) => {
  const [selectedMapId, setSelectedMapId] = useState('');
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const authUser = useAuthUser();
  const offlineMapPacks = useOfflineMapPacks(authUser?.id);
  const { data: remoteOfflineMaps } = useOfflineMaps();
  const offlineMaps = useOfflineMapsSyncWithAccount(
    offlineMapPacks,
    remoteOfflineMaps,
  );
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
      {selectedMap ? (
        <OfflineMapComponent
          map={selectedMap}
          onClose={() => setSelectedMapId('')}
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
              return (
                <View style={{ maxWidth: 300 }} key={offlineMap.id}>
                  <MapPreviewCard
                    id={offlineMap.id}
                    onShowMapClick={setSelectedMapId}
                    item={offlineMap}
                    isDownloaded={offlineMap.downloaded}
                  />
                </View>
              );
            })}
            {offlineMaps.length === 0 && fallback}
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

const useOfflineMapPacks = (authUserId: string) => {
  const [offlineMapPacks, setOfflineMapPacks] = useState<OfflineMap[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const offlineMapPacksRes = await offlineManager.getPacks();
          const userOfflineMap = offlineMapPacksRes
            .map(({ pack, _metadata }) => {
              try {
                const metadata = JSON.parse(pack.metadata);
                return {
                  id: metadata.id,
                  name: _metadata.name,
                  bounds: pack.bounds,
                  styleURL: OFFLINE_MAP_STYLE_URL,
                  userId: _metadata.userId,
                  downloaded: true,
                };
              } catch {
                return null;
              }
            })
            .filter((offlineMap) => {
              if (!offlineMap) {
                return false;
              }

              return offlineMap.userId === authUserId;
            });
          setOfflineMapPacks(userOfflineMap);
        } catch (e) {
          console.log(e);
        }
      })();
    }, []),
  );

  return offlineMapPacks;
};

const useOfflineMapsSyncWithAccount = (
  offlineMapPacks,
  remoteOfflineMaps,
): OfflineMap[] => {
  const { connectionStatus } = useOfflineStore();
  return useMemo<OfflineMap[]>(() => {
    if (!Array.isArray(remoteOfflineMaps)) {
      return [];
    }

    const unSavedRemoteMaps = remoteOfflineMaps
      .filter(({ id }) => {
        return offlineMapPacks.findIndex((mapPack) => mapPack.id === id) === -1;
      })
      .map((remoteMap) => {
        return {
          id: remoteMap.id,
          name: remoteMap.name,
          styleURL: OFFLINE_MAP_STYLE_URL,
          bounds: remoteMap.bounds,
          minZoom: remoteMap.minZoom,
          maxZoom: remoteMap.maxZoom,
          userId: remoteMap?.metadata?.userId,
          downloaded: false,
        };
      });

    const maps = offlineMapPacks.concat(unSavedRemoteMaps);

    if (connectionStatus === 'connected') {
      return maps;
    }

    return maps.filter(({ downloaded }) => downloaded);
  }, [offlineMapPacks, remoteOfflineMaps]);
};
