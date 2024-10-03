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
    const { metadata, ...offlineMapData } = offlineMap;
    const offlineMapClass = new OfflineMap();
    console.log({ offlineMapData });
    const newOfflineMap = await offlineMapClass.create({
      metadata: null,
      ...offlineMapData,
    });

    executionCtx.waitUntil(
      GeojsonStorageService.save(
        'map',
        JSON.stringify(metadata.shape),
        newOfflineMap.id,
      ),
    );

    return newOfflineMap;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
