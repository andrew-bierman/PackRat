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
    if (error.message.includes('SQLITE_CONSTRAINT')) {
      throw new Error('Map with the following name already exists');
    }
    throw new Error('Unable to save offline map');
  }
};
