import { and, eq, like, sql } from 'drizzle-orm';
import { DbClient } from '../../../db/client';
import {
  item,
  itemPacks,
  pack,
  trip,
  userFavoritePacks,
} from '../../../db/schema';
import { literal } from 'src/drizzle/helpers';
import { convertWeight } from '../../../utils/convertWeight';
import {
  getPaginationParams,
  type PaginationParams,
} from '../../../helpers/pagination';
import { FeedQueryBy, Modifiers } from '../models';

export class Feed {
  async findFeed(
    queryBy: FeedQueryBy,
    modifiers?: Modifiers,
    excludeType?: 'trips' | 'packs',
    pagination?: PaginationParams,
  ) {
    try {
      let packsQuery = DbClient.instance
        .select({
          id: pack.id,
          createdAt: pack.createdAt,
          name: pack.name,
          owner_id: pack.owner_id,
          grades: pack.grades,
          scores: pack.scores,
          type: literal('pack'),
          description: literal(''),
          destination: literal(''),
          favorites_count: sql`COALESCE(COUNT(DISTINCT ${userFavoritePacks.userId}), 0) as favorites_count`,
          quantity: sql`COALESCE(SUM(DISTINCT ${item.quantity}), 0)`,
          userFavorites: sql`GROUP_CONCAT(DISTINCT ${userFavoritePacks.userId})`,
          total_weight: sql`COALESCE(SUM(DISTINCT ${item.weight} * ${item.quantity}), 0)`,
        })
        .from(pack)
        .leftJoin(userFavoritePacks, eq(pack.id, userFavoritePacks.packId))
        .leftJoin(itemPacks, eq(pack.id, itemPacks.packId))
        .leftJoin(item, eq(itemPacks.itemId, item.id))
        .groupBy(pack.id);

      if (modifiers) {
        packsQuery = packsQuery.where(
          this.generateWhereConditions(modifiers, pack),
        );
      }

      let tripsQuery = DbClient.instance
        .select({
          id: trip.id,
          createdAt: trip.createdAt,
          name: trip.name,
          owner_id: trip.owner_id,
          grades: literal('{}'),
          scores: literal('{}'),
          type: literal('trip'),
          description: trip.description,
          destination: trip.destination,
          favorites_count: literal('0'),
          quantity: literal(null),
          userFavorites: literal('[]'),
          total_weight: literal('0'),
        })
        .from(trip);

      if (modifiers) {
        tripsQuery = tripsQuery.where(
          this.generateWhereConditions(modifiers, trip),
        );
      }

      if (excludeType === 'packs') {
        packsQuery = null;
      }
      if (excludeType === 'trips') {
        tripsQuery = null;
      }

      packsQuery = this.applyPackOrders(
        packsQuery,
        queryBy,
        tripsQuery === null,
      );

      let feedQuery = null;
      if (packsQuery && tripsQuery) {
        feedQuery = packsQuery.union(tripsQuery);
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
        const orderDirection = queryBy === 'Most Recent' ? 'desc' : 'asc';
        feedQuery = feedQuery.orderBy((row) => row.createdAt, orderDirection);
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
        Favorite: { field: 'favorites_count', orderDirection: 'desc' },
        Heaviest: { field: 'total_weight', orderDirection: 'desc' },
        Lightest: { field: 'total_weight', orderDirection: 'asc' },
      };
      return packQuery.orderBy(
        orderConfig[queryBy].field,
        orderConfig[queryBy].orderDirection,
      );
    }

    return packQuery;
  }

  computeTotalScores(pack) {
    if (!pack.scores) return 0;
    const scores = this.parseJSON(pack.scores);
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
    const conditions = [];

    if (modifiers.isPublic !== undefined) {
      conditions.push(eq(table.is_public, modifiers.isPublic));
    }

    if (modifiers.ownerId) {
      conditions.push(eq(table.owner_id, modifiers.ownerId));
    }

    if (modifiers.searchTerm) {
      conditions.push(like(table.name, `%${modifiers.searchTerm}%`));
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }
}
