import { and, asc, desc, eq, like, sql, SQL } from 'drizzle-orm';
import { DbClient } from '../../../db/client';
import {
  item,
  itemPacks,
  pack,
  trip,
  userFavoritePacks,
} from '../../../db/schema';
import { literal } from '../../../drizzle/helpers';
import {
  getPaginationParams,
  getPrevOffset,
  type PaginationParams,
} from '../../../helpers/pagination';
import { FeedQueryBy, Modifiers } from '../models';

// Adding aliases to columns for order operations
export class Feed {
  async findFeed(
    queryBy: FeedQueryBy,
    modifiers?: Modifiers,
    excludeType?: 'trips' | 'packs',
    pagination?: PaginationParams,
  ) {
    let currentPagination = getPaginationParams(pagination);

    // it tries to load previous page if current page is empty
    // Using while instead of recursion
    while (true) {
      const { data, totalCount } = await this.findFeedQuery(
        queryBy,
        modifiers,
        excludeType,
        currentPagination,
      );

      if (totalCount === 0 || !data?.length) {
        const prevOffset = getPrevOffset(currentPagination);
        if (prevOffset === false) {
          return {
            data: [],
            totalCount: 0,
            currentPagination: { offset: 0, limit: currentPagination.limit },
          };
        }

        currentPagination = {
          offset: prevOffset,
          limit: currentPagination.limit,
        };
      } else {
        return {
          data,
          totalCount,
          currentPagination,
        };
      }
    }
  }

  async findFeedQuery(
    queryBy: FeedQueryBy,
    modifiers?: Modifiers,
    excludeType?: 'trips' | 'packs',
    pagination?: PaginationParams,
  ) {
    try {
      let packsQuery: any = DbClient.instance
        .select({
          id: pack.id,
          createdAt: sql`${pack.createdAt} as createdAt`,
          name: pack.name,
          owner_id: pack.owner_id,
          grades: pack.grades,
          scores: pack.scores,
          is_public: pack.is_public,
          type: literal('pack'),
          description: literal(''),
          destination: literal(''),
          favorites_count: sql`COALESCE(COUNT(DISTINCT ${userFavoritePacks.userId}), 0) as favorites_count`,
          quantity: sql`COALESCE(SUM(${itemPacks.quantity}), 0)`,
          userFavorites: sql`GROUP_CONCAT(DISTINCT ${userFavoritePacks.userId}) as userFavorites`,
          total_weight: sql`COALESCE(SUM(${item.weight} * ${itemPacks.quantity}), 0) as total_weight`,
          hasItem: modifiers?.itemId
            ? sql`CASE WHEN COUNT(DISTINCT CASE WHEN ${itemPacks.itemId} = ${modifiers.itemId} THEN 1 ELSE NULL END) > 0 THEN TRUE ELSE FALSE END as hasItem`
            : sql`NULL as hasItem`,
          activity: sql`NULL as activity`,
          start_date: sql`NULL as start_date`,
          end_date: sql`NULL as end_date`,
        })
        .from(pack)
        .leftJoin(userFavoritePacks, eq(pack.id, userFavoritePacks.packId))
        .leftJoin(itemPacks, eq(pack.id, itemPacks.packId))
        .leftJoin(item, eq(itemPacks.itemId, item.id))
        .groupBy(pack.id);

      if (modifiers?.includeUserFavoritesOnly) {
        // Cast or conditionally apply .having() only if we have valid conditions
        const havingConditions = this.generateHavingConditions(modifiers, pack);
        if (havingConditions) {
          packsQuery = (packsQuery as any).having(havingConditions as any);
        }
      }

      if (modifiers) {
        const whereConditions = this.generateWhereConditions(modifiers, pack);
        if (whereConditions) {
          packsQuery = (packsQuery as any).where(whereConditions as any);
        }
      }

      let tripsQuery: any = DbClient.instance
        .select({
          id: trip.id,
          createdAt: sql`${trip.createdAt} as createdAt`,
          name: trip.name,
          owner_id: trip.owner_id,
          grades: literal('{}'),
          scores: trip.scores,
          is_public: trip.is_public,
          type: literal('trip'),
          description: trip.description,
          destination: trip.destination,
          favorites_count: literal('0'),
          quantity: sql`NULL as quantity`,
          userFavorites: literal('[]'),
          total_weight: literal('0'),
          hasItem: sql`NULL as hasItem`,
          activity: trip.activity,
          start_date: trip.start_date,
          end_date: trip.end_date,
        })
        .from(trip);

      if (modifiers) {
        tripsQuery = tripsQuery.where(
          this.generateWhereConditions(modifiers, trip),
        );
      }

      if (excludeType === 'packs') {
        packsQuery = null as any;
      }
      if (excludeType === 'trips') {
        tripsQuery = null as any;
      }

      packsQuery = this.applyPackOrders(
        packsQuery,
        queryBy,
        tripsQuery === null,
      );

      let feedQuery: any = null;
      if (packsQuery && tripsQuery) {
        feedQuery = (packsQuery as any).union(tripsQuery as any);
      } else if (packsQuery) {
        feedQuery = packsQuery;
      } else if (tripsQuery) {
        feedQuery = tripsQuery;
      }

      const totalCountQuery = await DbClient.instance
        .select({
          totalCount: sql`COUNT(*)`,
        })
        .from(feedQuery.as('feed'))
        .all();
      const { limit, offset } = getPaginationParams(pagination);
      if (queryBy === 'Oldest' || queryBy === 'Most Recent') {
        const order =
          queryBy === 'Most Recent'
            ? desc(sql`createdAt`)
            : asc(sql`createdAt`);
        if (feedQuery) {
          feedQuery = feedQuery.orderBy(order);
        }
      }

      const feedData = await feedQuery.limit(limit).offset(offset).all();
      const data = (await feedData).map((data) => ({
        ...data,
        scores: this.parseJSON(data.scores as string),
        grades: this.parseJSON(data.grades as string),
        total_score: this.computeTotalScores(data),
        userFavoritePacks: this.computeUserFavoritePacks(data),
      }));

      return {
        totalCount: totalCountQuery?.[0]?.totalCount || 0,
        data,
      };
    } catch (error) {
      throw new Error(`Error finding public feed: ${error.message}`);
    }
  }

  parseJSON(JSONString: string) {
    try {
      const parsedData = JSON.parse(JSONString);
      return parsedData;
    } catch {
      console.error(`Error: ${JSONString}`);
      return {};
    }
  }

  computeFavouritesCount(pack) {
    const userFavorites = this.computeUserFavoritePacks(pack);
    return userFavorites.length;
  }

  applyPackOrders(packQuery, queryBy: FeedQueryBy, enabled: boolean) {
    if (!packQuery || !enabled) return packQuery;

    if (
      queryBy === 'Favorite' ||
      queryBy === 'Heaviest' ||
      queryBy === 'Lightest'
    ) {
      const orderConfig = {
        Favorite: desc(sql`favorites_count`),
        Heaviest: desc(sql`total_weight`),
        Lightest: asc(sql`total_weight`),
      };
      return packQuery.orderBy(orderConfig[queryBy]);
    }

    return packQuery;
  }

  computeTotalScores(resource) {
    if (resource.type === 'trip') {
      return resource?.scores?.totalScore || 0;
    }

    if (!resource.scores) return 0;
    const scores = this.parseJSON(resource.scores);
    const scoresArray: number[] = Object.values(scores);
    const sum: number = scoresArray.reduce(
      (total: number, score: number) => total + score,
      0,
    );
    const average: number =
      scoresArray.length > 0 ? sum / scoresArray.length : 0;

    return Math.round(average * 100) / 100;
  }

  computeUserFavoritePacks({ userFavorites }) {
    return userFavorites?.split?.(',') || [];
  }

  generateWhereConditions(
    modifiers: Modifiers,
    table: typeof trip | typeof pack,
  ) {
    const conditions: SQL<unknown>[] = [];

    if (modifiers?.isPublic !== undefined) {
      conditions.push(eq(table.is_public, modifiers.isPublic));
    }

    if (modifiers?.ownerId) {
      conditions.push(eq(table.owner_id, modifiers.ownerId));
    }

    if (modifiers?.searchTerm) {
      conditions.push(like(table.name, `%${modifiers.searchTerm}%`));
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }

  generateHavingConditions(
    modifiers: Modifiers,
    table: typeof trip | typeof pack,
  ) {
    const conditions: SQL<unknown>[] = [];

    if (modifiers?.ownerId && modifiers.includeUserFavoritesOnly) {
      conditions.push(
        sql`userFavorites LIKE CONCAT('%', ${modifiers.ownerId}, '%')`,
      );
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }
}
