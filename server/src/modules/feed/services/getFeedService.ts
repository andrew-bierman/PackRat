// services/tripService.ts

import { PaginationParams } from '../../../helpers/pagination';
import { Feed } from '../model';
import { FeedQueryBy, Modifiers } from '../models';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} authenticatedUserId - The authenticated user's ID.
 * @param {string} queryBy - The query parameter to sort the trips.
 * @return {Promise<object[]>} The public trips.
 */
export const getFeedService = async (
  queryBy: FeedQueryBy,
  modifiers?: Modifiers,
  excludeType?: 'trips' | 'packs',
  pagination?: PaginationParams,
) => {
  try {
    const feedClass = new Feed();
    const publicFeed = await feedClass.findFeed(
      queryBy,
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
