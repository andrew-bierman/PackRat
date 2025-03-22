import * as validator from '@packrat/validations';
import { getPackTemplatesService } from '../../services/packTemplate/packTemplate.service';
import { protectedProcedure } from '../../trpc';
import { ORDER_BY } from '../../drizzle/methods/PackTemplate'; // Import the correct ORDER_BY type

interface PaginationParams {
  offset: number;
  limit: number;
}

export function getPackTemplatesRoute() {
  return protectedProcedure
    .input(validator.getPackTemplates)
    .query(async (opts) => {
      const { filter, orderBy, pagination } = opts.input;
      const paginationParams: PaginationParams = {
        offset: pagination.offset || 0,
        limit: pagination.limit || 10,
      };
      return await getPackTemplatesService(
        paginationParams,
        filter,
        orderBy as ORDER_BY,
      );
    });
}
