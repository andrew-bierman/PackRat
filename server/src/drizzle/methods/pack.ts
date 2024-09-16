import { eq, sql, asc, desc, and, like, or } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { type InsertPack, pack as PackTable, itemPacks } from '../../db/schema';
import { convertWeight } from '../../utils/convertWeight';

export class Pack {
  getRelations({ includeRelated, ownerId = true, completeItems = false }) {
    if (!includeRelated) {
      return { with: {} };
    }
    const withRelations = {
      ...(ownerId
        ? { owner: { columns: { id: true, name: true, username: true } } }
        : {}),
      userFavoritePacks: { columns: { userId: true } },
      itemPacks: completeItems
        ? {
            columns: { packId: true },
            with: {
              item: {
                columns: {
                  id: true,
                  name: true,
                  ownerId: true,
                  weight: true,
                  quantity: true,
                  unit: true,
                },
                with: {
                  category: {
                    columns: { id: true, name: true },
                  },
                },
              },
            },
          }
        : { columns: { itemId: true } },
      trips: { columns: { id: true, name: true } },
    };
    return { with: withRelations };
  }

  async create(data: InsertPack) {
    try {
      const pack = await DbClient.instance
        .insert(PackTable)
        .values(data)
        .returning()
        .get();
      return pack;
    } catch (error) {
      throw new Error(`Failed to create a pack: ${error.message}`);
    }
  }

  async update(data: any, filter = eq(PackTable.id, data.id)) {
    try {
      const updatedPack = await DbClient.instance
        .update(PackTable)
        .set(data)
        .where(filter)
        .returning()
        .get();
      return updatedPack;
    } catch (error) {
      throw new Error(`Failed to update pack: ${error.message}`);
    }
  }

  async delete(id: string, filter = eq(PackTable.id, id)) {
    try {
      const deletedPack = await DbClient.instance
        .delete(PackTable)
        .where(filter)
        .returning()
        .get();
      return deletedPack;
    } catch (error) {
      throw new Error(`Failed to delete pack: ${error.message}`);
    }
  }

  async findPack({
    id,
    name,
    includeRelated = true,
  }: {
    id?: string;
    name?: string;
    includeRelated?: boolean;
  }) {
    try {
      let filter;
      if (id) {
        filter = eq(PackTable.id, id);
      } else if (name) {
        filter = eq(PackTable.name, name);
      } else {
        throw new Error('Either id or name must be provided');
      }
      const relations = this.getRelations({
        includeRelated,
        completeItems: true,
      });
      const pack = await DbClient.instance.query.pack.findFirst({
        where: filter,
        ...relations,
      });
      return pack;
    } catch (error) {
      throw new Error(`Failed to find template: ${error.message}`);
    }
  }

  getOrderBy({
    sortOption,
    sortItems,
    queryBy,
  }: {
    sortOption?: object;
    sortItems?: boolean;
    queryBy?: string;
  }) {
    try {
      if (sortItems && queryBy) {
        const itemOrder = queryBy === 'Most Items' ? 'DESC' : 'ASC';
        const itemCountQuery = sql`(SELECT COUNT(*) FROM ${itemPacks} WHERE ${itemPacks.packId} = ${PackTable.id})`;
        return itemOrder === 'ASC' ? asc(itemCountQuery) : desc(itemCountQuery);
      } else if (sortOption && Object.keys(sortOption).length > 0) {
        const entries = Object.entries(sortOption);
        if (entries.length > 0) {
          const [sortField, sortOrder] = entries[0] || [];
          if (!sortField || !sortOrder) {
            throw new Error('Invalid sort option');
          }
          return (pack: any) =>
            sortOrder === 'ASC' ? asc(pack[sortField]) : desc(pack[sortField]);
        }
      } else {
        throw new Error('Sort option is required for non-item sorting');
      }
    } catch (error) {
      throw new Error(`Failed to order by records: ${error.message}`);
    }
  }

  async findMany(options: any) {
    try {
      const {
        includeRelated = false,
        sortOption,
        ownerId,
        is_public,
        searchQuery,
        page = 1,
        limit = 10,
      } = options;
  
      const filterConditions = [];
  
      if (ownerId) {
        filterConditions.push(eq(PackTable.owner_id, ownerId));
      }
  
      if (is_public !== undefined) {
        filterConditions.push(eq(PackTable.is_public, is_public));
      }
  
      if (searchQuery) {
        filterConditions.push(
          or(
            like(PackTable.name, `%${searchQuery.toLowerCase()}%`)
          )
        );
      }
  
      const modifiedFilter = filterConditions.length > 0 ? and(...filterConditions) : null;
  
      const orderByFunction = this.getOrderBy({ sortOption });
      const relations = this.getRelations({
        includeRelated,
        completeItems: true,
      });
  
      const offset = (page - 1) * limit; // Calculate the offset based on the page and limit

      const packs = await DbClient.instance.query.pack.findMany({
        ...(modifiedFilter && { where: modifiedFilter }),
        orderBy: orderByFunction,
        ...(includeRelated ? relations : {}),
        offset: offset, // Apply offset for pagination
        limit: limit,   // Apply limit for pagination
      });
  
      return packs.map((pack: any) => ({
        ...pack,
        scores: JSON.parse(pack.scores as string),
        grades: JSON.parse(pack.grades as string),
        total_weight: this.computeTotalWeight(pack),
        favorites_count: this.computeFavouritesCount(pack),
        total_score: this.computeTotalScores(pack),
        items: pack.itemPacks.map((itemPack) => itemPack.item),
      }));
    } catch (error) {
      console.error('Error in findMany:', error); // Log the error
      throw new Error(`Failed to fetch packs: ${error.message}`);
    }
  }
  

  async sortPacksByItems(options: any) {
    try {
      const { queryBy, sortItems, is_public, ownerId } = options;
      const modifiedFilter = ownerId
        ? eq(PackTable.owner_id, ownerId)
        : is_public
          ? eq(PackTable.is_public, is_public)
          : null;
      const orderByFunction: any = this.getOrderBy({ sortItems, queryBy });
      if (modifiedFilter) {
        const sortedPacks = await DbClient.instance
          .select()
          .from(PackTable)
          .where(modifiedFilter)
          .orderBy(orderByFunction)
          .all();
        return sortedPacks;
      } else {
        throw new Error('Filter is required for sorting packs by items');
      }
    } catch (error) {
      throw new Error(`Failed to sort packs by items: ${error.message}`);
    }
  }

  async sortPacksByWeight(packs: any, queryBy: string) {
    try {
      let sortedPacks = packs.sort(
        (pack1, pack2) => pack2.total_weight - pack1.total_weight,
      );
      if (queryBy === 'Lightest') {
        sortedPacks = packs.sort(
          (pack1, pack2) => pack1.total_weight - pack2.total_weight,
        );
      }
      return sortedPacks;
    } catch (error) {
      throw new Error(`Failed to sort packs by weight: ${error.message}`);
    }
  }

  async sortPacksByFavoritesCount(packs: any) {
    try {
      const sortedPacks = packs.sort(
        (pack1, pack2) => pack2.favorites_count - pack1.favorites_count,
      );
      return sortedPacks;
    } catch (error) {
      throw new Error(
        `Failed to sort packs by favorite count: ${error.message}`,
      );
    }
  }

  // async sortPacksByOwner({
  //   ownerId,
  //   queryBy,
  //   sortOption = DEFAULT_SORT,
  //   isSortingByItems = false,
  // }) {
  //   try {
  //   } catch (error) {
  //     throw new Error(`Failed to sort packs by owners: ${error.message}`);
  //   }
  // }

  computeTotalWeight(pack) {
    if (pack.itemPacks && pack.itemPacks.length > 0) {
      const totalWeight = pack.itemPacks.reduce(
        (total: number, itemPack: any) => {
          const weightInGrams = convertWeight(
            itemPack.item.weight,
            itemPack.item.unit,
            'g',
          );
          return total + weightInGrams * itemPack.item.quantity;
        },
        0,
      );
      return totalWeight;
    }
    return 0;
  }

  computeFavouritesCount(pack) {
    return pack.userFavoritePacks?.length ?? 0;
  }

  computeTotalScores(pack) {
    if (!pack.scores) return 0;
    const scores = JSON.parse(pack.scores);
    const scoresArray: number[] = Object.values(scores);
    const sum: number = scoresArray.reduce(
      (total: number, score: number) => total + score,
      0,
    );
    const average: number =
      scoresArray.length > 0 ? sum / scoresArray.length : 0;

    return Math.round(average * 100) / 100;
  }
}