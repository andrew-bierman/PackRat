import { DbClient } from '../../db/client';
import { eq, and } from 'drizzle-orm';
import {
  type InsertItemPackTemplate,
  itemPackTemplate as ItemPackTemplateTable,
} from '../../db/schema';

export class ItemPackTemplate {
  async create(data: InsertItemPackTemplate) {
    try {
      const item = await DbClient.instance
        .insert(ItemPackTemplateTable)
        .values(data)
        .returning()
        .get();

      return item;
    } catch (error) {
      throw new Error(`Failed to create item: ${error.message}`);
    }
  }

  async findByItemIdAndPackTemplateId({
    itemId,
    packTemplateId,
  }: {
    itemId: string;
    packTemplateId: string;
  }) {
    const itemFilter = eq(ItemPackTemplateTable.itemId, itemId);
    const packFilter = eq(ItemPackTemplateTable.packTemplateId, packTemplateId);

    const filter = and(itemFilter, packFilter);

    return await DbClient.instance.query.itemPackTemplate.findFirst({
      where: filter,
    });
  }
}
