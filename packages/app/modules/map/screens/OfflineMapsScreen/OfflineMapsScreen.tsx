import React, { useState, useMemo, type ReactNode, type FC } from 'react';
import useTheme from 'app/hooks/useTheme';
import { MapPreviewCard } from 'app/modules/map/components/MapPreviewCard';
import { useOfflineMaps } from '../../hooks/useOfflineMaps';
import { OfflineMapComponent } from './OfflineMap';
import { useAuthUser } from 'app/modules/auth';
import { OFFLINE_MAP_STYLE_URL } from 'app/modules/map/constants';
import { useOfflineStore } from 'app/atoms';
import { FeedList } from 'app/modules/feed/components';
import Layout from 'app/components/layout/Layout';
import { useAtom } from 'jotai';
import { searchQueryAtom } from 'app/modules/feed/atoms';
import { useDeleteOfflineMap } from './useDeleteOfflineMap';
import { useOfflineMapPacks } from './useOfflineMapPacks';

export interface OfflineMap {
  id: string;
  name: string;
  styleURL: string;
  userId: string;
  minZoom?: number;
  maxZoom?: number;
  bounds: [number[], number[]];
  downloaded: boolean;
  fileName?: string;
}

interface OfflineMapScreenProps {
  fallback?: ReactNode;
}

export const OfflineMapsScreen: FC<OfflineMapScreenProps> = ({ fallback }) => {
  const [selectedMapId, setSelectedMapId] = useState('');
  const [searchQuery] = useAtom(searchQueryAtom);
  const handleDeleteMap = useDeleteOfflineMap();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const authUser = useAuthUser();
  const offlineMapPacks = useOfflineMapPacks(authUser?.id, searchQuery);
  const { data: remoteOfflineMaps } = useOfflineMaps({ search: searchQuery });
  const offlineMaps = useOfflineMapsSyncWithAccount(
    offlineMapPacks,
    remoteOfflineMaps,
  );
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
              onDelete={handleDeleteMap}
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
