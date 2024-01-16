import { eq, and } from 'drizzle-orm';
import { createDb } from '../../db/client';
import {
  itemPacks as ItemPacksTable,
  type InsertItemPack,
} from '../../db/schema';
import { getDB } from '../../trpc/context';

export class ItemPacks {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async create(itemPack: InsertItemPack) {
    try {
      const record = (await this.createInstance())
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
      const deletedRecord = (await this.createInstance())
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
    await (
      await this.createInstance()
    )
      .delete(ItemPacksTable)
      .where(
        and(
          eq(ItemPacksTable.itemId, oldItemId),
          eq(ItemPacksTable.packId, packId),
        ),
      )
      .execute();
    const newRelation = { itemId: newItemId, packId };
    await (await this.createInstance())
      .insert(ItemPacksTable)
      .values(newRelation)
      .returning()
      .execute();
  }
}
