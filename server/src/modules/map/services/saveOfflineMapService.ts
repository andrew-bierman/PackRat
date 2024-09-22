// services/tripService.ts

import { PaginationParams } from '../../../helpers/pagination';
import { OfflineMap } from '../model';
import { OfflineMap as IOfflineMap } from '../models';

export const saveOfflineMapService = async (offlineMap: IOfflineMap) => {
  try {
    const offlineMapClass = new OfflineMap();
    const newOfflineMap = await offlineMapClass.create(offlineMap);
    return newOfflineMap;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
