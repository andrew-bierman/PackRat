import { eq, and } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { itemPacks } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class ItemPacks {

  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance
  }


  async updateRelation(oldItemId: string, newItemId: string, packId: string) {
    await (await this.createInstance())
      .delete(itemPacks)
      .where(
        and(eq(itemPacks.itemId, oldItemId), eq(itemPacks.packId, packId)),
      );

    await (await this.createInstance())
      .insert(itemPacks)
      .values({ itemId: newItemId, packId })
      .returning();
  }
}
