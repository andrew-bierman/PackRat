import { eq } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import {
  type InsertItemCategory,
  itemCategory as ItemCategoryTable,
} from '../../db/schema';

export class ItemCategory {
  async findItemCategory({ id, name }: { id?: string; name?: any }) {
    try {
      const filter = id
        ? eq(ItemCategoryTable.id, id)
        : eq(ItemCategoryTable.name, name);
      const itemCategory = await DbClient.instance
        .select()
        .from(ItemCategoryTable)
        .where(filter)
        .limit(1)
        .get();
      return itemCategory;
    } catch (error) {
      console.error(`Failed to find item category: ${error.message}`);
      return null;
    }
  }

  async create(data: InsertItemCategory) {
    try {
      const category = await DbClient.instance
        .insert(ItemCategoryTable)
        .values(data)
        .returning()
        .get();
      return category;
    } catch (error) {
      throw new Error(`Failed to create item category: ${error.message}`);
    }
  }
}
