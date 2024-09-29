// services/tripService.ts

import { PaginationParams } from '../../../helpers/pagination';
import { Feed } from '../model';
import { Modifiers, FeedQueryBy } from '../models';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} queryBy - The query parameter to sort the trips.
 * @return {Promise<object[]>} The public trips.
 */
export const getFeedService = async (
  queryBy: string,
  modifiers?: Modifiers,
  excludeType?: 'trips' | 'packs',
  pagination?: PaginationParams,
) => {
  try {
    const feedClass = new Feed();
    if (queryBy === 'favorites') {
      modifiers.includeUserFavoritesOnly = true;
    }
    const publicFeed = await feedClass.findFeed(
      queryBy as FeedQueryBy,
      modifiers,
      excludeType,
      pagination,
    );
    return publicFeed;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
