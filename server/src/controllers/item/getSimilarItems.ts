import { getSimilarItemsService } from '../../services/item/getSimilarItemsService';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

export function getSimilarItemsRoute() {
  return publicProcedure
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
