import * as validator from '@packrat/validations';
import { getPackTemplatesService } from 'src/services/packTemplate/packTemplate.service';
import { protectedProcedure } from 'src/trpc';

export function getPackTemplatesRoute() {
  return protectedProcedure
    .input(validator.getPackTemplates)
    .query(async (opts) => {
      const { filter, orderBy, pagination } = opts.input;
      return await getPackTemplatesService(pagination, filter, orderBy);
    });
}
