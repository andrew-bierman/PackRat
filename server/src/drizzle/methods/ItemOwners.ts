import { createDb } from '../../db/client';
import {
  type InsertItemOwner,
  itemOwners as ItemOwnersTable,
} from '../../db/schema';
import { getDB } from '../../trpc/context';

export class ItemOwners {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async create(itemOwner: InsertItemOwner) {
    try {
      const record = (await this.createInstance())
        .insert(ItemOwnersTable)
        .values(itemOwner)
        .returning()
        .get();
      return record;
    } catch (error) {
      throw new Error(`Failed to create item owner record: ${error.message}`);
    }
  }
}
