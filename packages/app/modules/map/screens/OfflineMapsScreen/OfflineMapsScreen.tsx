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
import { MapPreviewCard } from 'app/modules/map/components/MapPreviewCard';
import { useOfflineMaps } from '../../hooks/useOfflineMaps';
import { OfflineMapComponent } from './OfflineMap';
import { useFocusEffect } from 'expo-router';
import { useAuthUser } from 'app/modules/auth';
import { OFFLINE_MAP_STYLE_URL } from 'app/modules/map/constants';
import { useOfflineStore } from 'app/atoms';
import { FeedList } from 'app/modules/feed/components';
import Layout from 'app/components/layout/Layout';

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
  console.log(offlineMapPacks, '22');
  const selectedMap = useMemo(() => {
    return offlineMaps?.find?.((map) => map?.id === selectedMapId);
  }, [offlineMaps, selectedMapId]);

  return (
    <>
      {selectedMap ? (
        <OfflineMapComponent
          map={selectedMap}
          onClose={() => setSelectedMapId('')}
        />
      ) : null}
      <Layout>
        <FeedList
          data={offlineMaps}
          CardComponent={({ item }) => (
            <MapPreviewCard
              key={item?.id}
              id={item.id}
              item={item}
              onShowMapClick={setSelectedMapId}
            />
          )}
          isLoading={false}
          isError={false}
          separatorHeight={12}
        />
      </Layout>
    </>
  );
};

const useOfflineMapPacks = (authUserId: string) => {
  const [offlineMapPacks, setOfflineMapPacks] = useState<OfflineMap[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const offlineMapPacksRes = await offlineManager.getPacks();
          console.log({
            offlineMapPacksRes: offlineMapPacksRes.map((pack) => {
              try {
                const metadata = JSON.parse(pack.metadata);
                return {
                  id: metadata.id,
                  name: pack.name,
                  bounds: JSON.parse(pack.bounds),
                  styleURL: OFFLINE_MAP_STYLE_URL,
                  userId: metadata.userId,
                  downloaded: true,
                };
              } catch {
                return null;
              }
            }),
            userId: authUserId,
          });
          const userOfflineMap = offlineMapPacksRes
            .map((pack) => {
              console.log('metadata', pack.metadata, authUserId, pack.bounds);
              try {
                return {
                  id: pack.metadata.id,
                  name: pack.name,
                  bounds: pack.bounds,
                  styleURL: OFFLINE_MAP_STYLE_URL,
                  userId: pack.metadata.userId,
                  downloaded: true,
                };
              } catch (e) {
                console.log(e);
                return null;
              }
            })
            .filter((offlineMap) => {
              if (!offlineMap) {
                return false;
              }

              return offlineMap.userId === authUserId;
            })
            .filter(
              (offlineMap): offlineMap is OfflineMap => offlineMap !== null,
            );
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
