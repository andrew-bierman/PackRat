import { useCallback } from 'react';
import { offlineManager } from '@rnmapbox/maps';
import { useFocusEffect } from 'expo-router';
import { useAtom } from 'jotai';
import { offlineMapPacksAtom } from 'app/modules/map/atoms';
import { OFFLINE_MAP_STYLE_URL } from 'app/modules/map/constants';

export const useOfflineMapPacks = (
  authUserId: string,
  searchQuery?: string,
) => {
  const [offlineMapPacks, setOfflineMapPacks] = useAtom(offlineMapPacksAtom);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const offlineMapPacksRes = await offlineManager.getPacks();
          const userOfflineMap = offlineMapPacksRes
            .filter((pack) => {
              return (
                pack.metadata?.userId === authUserId &&
                pack.name
                  ?.toLowerCase?.()
                  .includes(searchQuery?.toLocaleLowerCase?.())
              );
            })
            .map((pack) => {
              try {
                return {
                  id: pack.metadata.id,
                  name: pack.name,
                  bounds: pack.bounds as unknown as [number[], number[]],
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
            .filter((offlineMap) => offlineMap !== null);
          setOfflineMapPacks(userOfflineMap);
        } catch (e) {
          console.log(e);
        }
      })();
    }, [searchQuery, authUserId]),
  );

  return offlineMapPacks;
};
