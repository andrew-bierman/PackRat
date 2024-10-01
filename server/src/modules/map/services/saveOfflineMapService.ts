// services/tripService.ts

import { GeojsonStorageService } from 'src/services/geojsonStorage';
import { PaginationParams } from '../../../helpers/pagination';
import { OfflineMap } from '../model';
import { OfflineMap as IOfflineMap } from '../models';

export const saveOfflineMapService = async (
  offlineMap: IOfflineMap,
  executionCtx: ExecutionContext,
) => {
  try {
    const offlineMapClass = new OfflineMap();
    const newOfflineMap = await offlineMapClass.create(offlineMap);

    executionCtx.waitUntil(
      GeojsonStorageService.save(
        'map',
        offlineMap.metadata.shape,
        newOfflineMap.id,
      ),
    );

    return newOfflineMap;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
