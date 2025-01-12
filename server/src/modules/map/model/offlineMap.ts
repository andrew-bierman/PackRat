import { and, eq, like, sql } from 'drizzle-orm';
import { DbClient } from '../../../db/client';
import { offlineMap, offlineMap as offlineMapTable } from '../../../db/schema';

import { OfflineMap as IOfflineMap } from '../models';
import {
  getPaginationParams,
  type PaginationParams,
} from '../../../helpers/pagination';

export class OfflineMap {
  async findByOwnerId(
    ownerId: string,
    search?: string,
    pagination?: PaginationParams,
  ) {
    try {
      const paginationParams = getPaginationParams(pagination);
      const offlineMaps = await DbClient.instance.query.offlineMap.findMany({
        where: and(
          eq(offlineMap.owner_id, ownerId),
          like(offlineMap.name, `%${search}%`),
        ),
        limit: paginationParams.limit,
        offset: paginationParams.offset,
      });

      const totalCountQuery = await DbClient.instance
        .select({
          totalCount: sql`COUNT(*)`,
        })
        .from(offlineMap)
        .where(eq(offlineMap.owner_id, ownerId))
        .all();

      return { offlineMaps, totalCount: totalCountQuery?.[0]?.totalCount || 0 };
    } catch (error) {
      throw new Error(`Failed to fetch offline maps: ${error.message}`);
    }
  }

  async create(data: IOfflineMap) {
    try {
      const newOfflineMap = await DbClient.instance
        .insert(offlineMapTable)
        .values({
          ...data,
          metadata: data.metadata as any,
        })
        .returning()
        .get();
      return newOfflineMap;
    } catch (error) {
      throw new Error(`Failed to create offline map: ${error.message}`);
    }
  }

  async delete(id: string) {
    try {
      const deletedItem = await DbClient.instance
        .delete(offlineMapTable)
        .where(eq(offlineMap.id, id))
        .returning()
        .get();

      return deletedItem;
    } catch (error) {
      throw new Error(`Failed to delete offline map: ${error.message}`);
    }
  }
}
