import { GeojsonStorageService } from '../../../services/geojsonStorage';
import { OfflineMap } from '../model';
import { OfflineMap as IOfflineMap } from '../models';

export const saveOfflineMapService = async (
  offlineMap: IOfflineMap,
  executionCtx: ExecutionContext,
) => {
  try {
    const { metadata, ...offlineMapData } = offlineMap;
    const { shape, ...restMetadata } = metadata as {
      shape: string;
      userId: string;
    };
    const offlineMapClass = new OfflineMap();
    const newOfflineMap = await offlineMapClass.create({
      metadata: restMetadata,
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
