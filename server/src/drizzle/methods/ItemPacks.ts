import { eq, and } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import {
  itemPacks as ItemPacksTable,
  type InsertItemPack,
} from '../../db/schema';

export class ItemPacks {
  async create(itemPack: InsertItemPack) {
    try {
      const record = await DbClient.instance
        .insert(ItemPacksTable)
        .values(itemPack)
        .returning()
        .get();
      return record;
    } catch (error) {
      throw new Error(`Failed to create item pack record: ${error.message}`);
    }
  }

  async delete(itemId: string, packId: string) {
    try {
      const deletedRecord = await DbClient.instance
        .delete(ItemPacksTable)
        .where(
          and(
            eq(ItemPacksTable.itemId, itemId),
            eq(ItemPacksTable.packId, packId),
          ),
        )
        .returning()
        .get();
      return deletedRecord;
    } catch (error) {
      throw new Error(`Failed to delete item pack record: ${error.message}`);
    }
  }

  async find({ itemId, packId }: { itemId?: string; packId?: string }) {
    const itemFilter = itemId ? eq(ItemPacksTable.itemId, itemId) : undefined;
    const packFilter = packId ? eq(ItemPacksTable.packId, packId) : undefined;

    let filter;
    if (itemId && packId) {
      filter = and(itemFilter!, packFilter!);
    } else if (itemId) {
      filter = itemFilter;
    } else if (packId) {
      filter = packFilter;
    }

    return await DbClient.instance.query.itemPacks.findFirst({
      where: filter,
    });
  }

  async updateRelation({ oldItemId, newItemId, packId }) {
    await DbClient.instance
      .delete(ItemPacksTable)
      .where(
        and(
          eq(ItemPacksTable.itemId, oldItemId),
          eq(ItemPacksTable.packId, packId),
        ),
      )
      .execute();
    const newRelation = { itemId: newItemId, packId };
    await DbClient.instance
      .insert(ItemPacksTable)
      .values(newRelation)
      .returning()
      .execute();
  }
}
