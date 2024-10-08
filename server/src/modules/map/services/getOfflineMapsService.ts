import { PaginationParams } from '../../../helpers/pagination';
import { OfflineMap } from '../model';

export const getOfflineMapsService = async (
  owner_id: string,
  pagination?: PaginationParams,
) => {
  try {
    const offlineMapClass = new OfflineMap();
    const { offlineMaps, totalCount } = await offlineMapClass.findByOwnerId(
      owner_id,
      pagination,
    );
    return { offlineMaps, totalCount };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch offline maps');
  }
};
