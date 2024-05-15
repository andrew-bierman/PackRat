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
    await await DbClient.instance
      .insert(ItemPacksTable)
      .values(newRelation)
      .returning()
      .execute();
  }
}
