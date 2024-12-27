import { DbClient } from '../../db/client';
import { and, asc, count, desc, eq, inArray, like, or, sql } from 'drizzle-orm';
import {
  type InsertItem,
  ITEM_TABLE_NAME,
  itemPacks,
  item as ItemTable,
  itemImage as itemImageTable,
} from '../../db/schema';
import { scorePackService } from '../../services/pack/scorePackService';
import { ItemPacks } from './ItemPacks';
import {
  getPaginationParams,
  PaginationParams,
} from '../../helpers/pagination';

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

  async insertImage(itemId: string, url: string) {
    try {
      const itemImage = await DbClient.instance
        .insert(itemImageTable)
        .values({
          itemId,
          url,
        })
        .run();

      return itemImage;
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }

  async createPackItem(data: InsertItem, packId: string, quantity: number) {
    // TODO wrap in transaction
    const item = await this.create(data);

    const itemPacksClass = new ItemPacks();
    await itemPacksClass.create({ itemId: item.id, packId, quantity });
    await this.updateScoreIfNeeded(packId);

    return item;
  }

  async updatePackItem(
    id: string,
    data: Partial<InsertItem>,
    packId: string,
    quantity?: number,
  ) {
    const item = await this.update(id, data);

    if (quantity)
      await DbClient.instance
        .update(itemPacks)
        .set({ quantity })
        .where(and(eq(itemPacks.packId, packId), eq(itemPacks.itemId, id)));

    await this.updateScoreIfNeeded(packId);

    return item;
  }

  async createBulk(data: InsertItem[]) {
    try {
      const insertedItems = [];
      for (const itemData of data) {
        const item = await DbClient.instance
          .insert(ItemTable)
          .values(itemData)
          .returning()
          .get();
        insertedItems.push(item);
      }
      return insertedItems;
    } catch (error) {
      throw new Error(`Failed to create items: ${error.message}`);
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
      const { packId } = await new ItemPacks().find({ itemId: id });
      const deletedItem = await DbClient.instance
        .delete(ItemTable)
        .where(filter)
        .returning()
        .get();

      await this.updateScoreIfNeeded(packId);

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
          images: {
            columns: {
              url: true,
            },
          },
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

  async findUserItems(
    ownerId: string,
    searchString: string,
    { limit, offset }: { limit: number; offset: number },
  ) {
    try {
      const items = await DbClient.instance.query.item.findMany({
        where: and(
          or(eq(ItemTable.global, true), eq(ItemTable.ownerId, ownerId)),
          like(ItemTable.name, `%${searchString}%`),
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
      throw new Error(`Failed to find user items: ${error.message}`);
    }
  }

  async findAllInArray(arr: string[]) {
    return await DbClient.instance.query.item.findMany({
      where: inArray(ItemTable.id, arr),
      with: {
        category: {
          columns: { id: true, name: true },
        },
        images: {
          columns: { url: true },
        },
      },
    });
  }

  async findGlobal(limit: number, offset: number, searchString: string) {
    try {
      const items = await DbClient.instance.query.item.findMany({
        where: and(
          eq(ItemTable.global, true),
          like(ItemTable.name, `%${searchString}%`),
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

  async findFeed(filters: {
    pagination?: PaginationParams;
    searchTerm?: string;
    queryBy?: string;
  }) {
    try {
      const { pagination, searchTerm, queryBy } = filters;
      const { limit, offset } = getPaginationParams(pagination);
      const orderByFunction = this.applyFeedOrdersOrders(queryBy);
      const items = await DbClient.instance.query.item.findMany({
        where: and(
          eq(ItemTable.global, true),
          like(ItemTable.name, `%${searchTerm}%`),
        ),
        with: {
          category: {
            columns: { id: true, name: true },
          },
          images: {
            columns: { url: true },
          },
        },
        offset,
        limit,
        orderBy: orderByFunction,
      });

      const totalCountQuery = await DbClient.instance
        .select({
          totalCount: sql`COUNT(*)`,
        })
        .from(ItemTable)
        .where(
          and(
            eq(ItemTable.global, true),
            like(ItemTable.name, `%${searchTerm}%`),
          ),
        )
        .all();

      return { data: items, totalCount: totalCountQuery?.[0]?.totalCount || 0 };
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
      if (!totalCount) {
        throw new Error(
          'Failed to find count of items: totalCount is undefined',
        );
      }
      return totalCount.value;
    } catch (error) {
      throw new Error(`Failed to find count of items: ${error.message}`);
    }
  }

  async updateScoreIfNeeded(packId?: string) {
    if (!packId) return;

    await scorePackService(packId);
  }

  applyFeedOrdersOrders(queryBy: string) {
    if (!['Most Recent', 'Oldest'].includes(queryBy)) {
      return desc(ItemTable.createdAt);
    }

    const orderConfig = {
      'Most Recent': desc(ItemTable.createdAt),
      Oldest: asc(ItemTable.createdAt),
    };

    return orderConfig[queryBy];
  }
}
