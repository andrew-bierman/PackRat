import { getSimilarItemsService } from '../../services/item/getSimilarItemsService';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

export function getSimilarItemsRoute() {
  return publicProcedure
    .input(validator.getSimilarItems)
    .query(async (opts) => {
      const { id } = opts.input;
      const items = await getSimilarItemsService(id);
      return items;
    });
}
