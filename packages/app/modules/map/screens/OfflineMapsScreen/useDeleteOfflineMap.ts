import { offlineManager } from '@rnmapbox/maps';
import { useAtom } from 'jotai';
import { offlineMapPacksAtom } from 'app/modules/map/atoms';
import type { OfflineMap } from 'app/modules/map/model';

import { queryTrpc } from 'app/trpc';
import { deleteFile } from 'app/utils/fileSystemNative';

export const useDeleteOfflineMap = () => {
  const [_, setOfflineMapPacks] = useAtom(offlineMapPacksAtom);

  const { mutateAsync } = queryTrpc.deleteOfflineMap.useMutation();

  const utils = queryTrpc.useContext();
  return async (item: OfflineMap) => {
    try {
      await mutateAsync({ id: item.id });
      await offlineManager.deletePack(item.name);
      setOfflineMapPacks((prev) =>
        prev.filter(({ name }) => name !== item.name),
      );
      utils.getOfflineMaps.invalidate();
    } catch {
      console.error('Failed to remove offline map');
    }
  };
};
