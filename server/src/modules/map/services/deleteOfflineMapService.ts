import { PaginationParams } from '../../../helpers/pagination';
import { OfflineMap } from '../model';

export const deleteOfflineMapService = async (id: string) => {
  try {
    const offlineMapClass = new OfflineMap();
    const deletedItem = await offlineMapClass.delete(id);
    return { deletedItem };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove offline map');
  }
};
