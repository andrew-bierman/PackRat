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
    const {
      metadata: { shape, ...metadata },
      ...offlineMapData
    } = offlineMap;
    const offlineMapClass = new OfflineMap();
    const newOfflineMap = await offlineMapClass.create({
      metadata,
      ...offlineMapData,
    });

    executionCtx.waitUntil(
      GeojsonStorageService.save(
        'map',
        JSON.stringify(shape),
        newOfflineMap.id,
      ),
    );

    return newOfflineMap;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
