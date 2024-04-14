import { and, count, eq, sql, ilike, like } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { type InsertItem, item as ItemTable } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Item {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async create(data: InsertItem) {
    try {
      const item = (await this.createInstance())
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
      const item = (await this.createInstance())
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
      const deletedItem = (await this.createInstance())
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
      const item = (await this.createInstance()).query.item.findFirst({
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
      const items = (await this.createInstance()).query.item.findMany({
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

  async findGlobal(limit: number, offset: number, searchString: string) {
    try {
      console.log(searchString);
      const items = (await this.createInstance()).query.item.findMany({
        where: and(
          eq(ItemTable.global, true),
          searchString ? like(ItemTable.name, `${searchString}%`) : undefined,
        ),
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
      const query = (await this.createInstance())
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
      const totalCount = await (await this.createInstance())
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
