import { eq, and } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { itemPacks } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class ItemPacks {
  private dbInstance;

  constructor() {
    this.dbInstance = createDb(getDB());
  }

  async updateRelation(oldItemId: string, newItemId: string, packId: string) {
    await this.dbInstance
      .delete(itemPacks)
      .where(
        and(eq(itemPacks.itemId, oldItemId), eq(itemPacks.packId, packId)),
      );

    await this.dbInstance
      .insert(itemPacks)
      .values({ itemId: newItemId, packId })
      .returning();
  }
}
