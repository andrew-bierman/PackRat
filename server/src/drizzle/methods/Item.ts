import { and, count, eq, sql } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { type InsertItem, item as ItemTable } from '../../db/schema';

export class Item {
  async create(data: InsertItem) {
    try {
      const item = await DbClient.instance
        .insert(ItemTable)
        .values(data)
        .returning()
        .get();
      return item;
    } catch (error) {
      throw new Error(`Failed to create item: ${error.message}`);
    }
  }

  async update(
    id: string,
    data: Partial<InsertItem>,
    filter = eq(ItemTable.id, id),
  ) {
    try {
      const item = await DbClient.instance
        .update(ItemTable)
        .set(data)
        .where(filter)
        .returning()
        .get();
      return item;
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }

  async delete(id: string, filter = eq(ItemTable.id, id)) {
    try {
      const deletedItem = await DbClient.instance
        .delete(ItemTable)
        .where(filter)
        .returning()
        .get();
      return deletedItem;
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }

  async findItem({ id, isGlobal = false, includeRest = false }) {
    try {
      const filter = isGlobal
        ? and(eq(ItemTable.id, id), eq(ItemTable.global, true))
        : eq(ItemTable.id, id);
      const item = await DbClient.instance.query.item.findFirst({
        where: filter,
        with: {
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        ...(includeRest && {
          with: {
            itemOwners: {
              columns: {
                ownerId: true,
              },
            },
            itemPacks: {
              columns: {
                packId: true,
              },
            },
          },
        }),
      });
      return item;
    } catch (error) {
      throw new Error(`Failed to find item by id: ${error.message}`);
    }
  }

  async findMany() {
    try {
      const items = await DbClient.instance.query.item.findMany({
        with: {
          itemPacks: {
            columns: {
              packId: true,
            },
          },
        },
      });
      return items;
    } catch (error) {
      throw new Error(`Failed to find all the items: ${error.message}`);
    }
  }

  async findGlobal(limit: number, offset: number) {
    try {
      const items = await DbClient.instance.query.item.findMany({
        where: eq(ItemTable.global, true),
        with: {
          category: {
            columns: { id: true, name: true },
          },
        },
        offset,
        limit,
        orderBy: (item, { desc }) => desc(item.createdAt),
      });
      return items;
    } catch (error) {
      throw new Error(`Failed to find global items: ${error.message}`);
    }
  }

  async findItemsByName(name: string) {
    try {
      const searchName = `%${name}%`;
      const query = await DbClient.instance
        .select()
        .from(ItemTable)
        .where(sql`lower(${ItemTable.name}) LIKE ${sql.placeholder('name')}`)
        .prepare();
      const items = await query.execute({ name: searchName });
      return items ?? null;
    } catch (error) {
      throw new Error(`Failed to find items by name: ${error.message}`);
    }
  }

  async count() {
    try {
      const totalCount = await DbClient.instance
        .select({ value: count() })
        .from(ItemTable)
        .where(eq(ItemTable.global, true))
        .get();
      return totalCount.value;
    } catch (error) {
      throw new Error(`Failed to find count of items: ${error.message}`);
    }
  }
}
