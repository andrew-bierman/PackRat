import { getSimilarItemsService } from '../../services/item/getSimilarItemsService';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

export const getSimilarItems = async (c) => {
  try {
    const { id, limit, visibility } = await c.req.json();

    if (limit < 1) {
      throw new Error('limit must be greater than 0');
    }

    const items = await getSimilarItemsService(id, limit, visibility);
    return c.json({ items }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to get similar items: ${error.message}` },
      500,
    );
  }
};

export function getSimilarItemsRoute() {
  return protectedProcedure
    .input(validator.getSimilarItems)
    .query(async (opts) => {
      const { id, limit, visibility } = opts.input;

      if (limit < 1) {
        throw new Error('limit must be greater than 0');
      }

      const items = await getSimilarItemsService(id, limit, visibility);
      return items;
    });
}
