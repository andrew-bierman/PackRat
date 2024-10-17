import { eq, and } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import {
  itemPacks as ItemPacksTable,
  type InsertItemPack,
} from '../../db/schema';
import { scorePackService } from 'src/services/pack/scorePackService';

export class ItemPacks {
  async create(itemPack: InsertItemPack) {
    try {
      const record = await DbClient.instance
        .insert(ItemPacksTable)
        .values(itemPack)
        .returning()
        .get();
      await this.updateScoreIfNeeded(itemPack.packId);

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
      await this.updateScoreIfNeeded(packId);

      return deletedRecord;
    } catch (error) {
      throw new Error(`Failed to delete item pack record: ${error.message}`);
    }
  }

  async toggle(itemId: string, packId: string) {
    try {
      const existingRecord = await DbClient.instance
        .select()
        .from(ItemPacksTable)
        .where(
          and(
            eq(ItemPacksTable.itemId, itemId),
            eq(ItemPacksTable.packId, packId),
          ),
        )
        .get();

      if (existingRecord) {
        const deletedRecord = await this.delete(itemId, packId);

        return deletedRecord;
      }

      const newRecord = await this.create({ itemId, packId });
      await this.updateScoreIfNeeded(packId);

      return newRecord;
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

  async updateScoreIfNeeded(packId?: string) {
    if (!packId) return;

    await scorePackService(packId);
  }
}
