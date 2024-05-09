import { DbClient } from '../../db/client';
import {
  type InsertItemOwner,
  itemOwners as ItemOwnersTable,
} from '../../db/schema';

export class ItemOwners {
  async create(itemOwner: InsertItemOwner) {
    try {
      const record = await DbClient.instance
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
