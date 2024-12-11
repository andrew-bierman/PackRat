import * as validator from '@packrat/validations';
import { publicProcedure } from 'src/trpc';
import { getPackTemplateService } from 'src/services/packTemplate/packTemplate.service';

export function getPackTemplateRoute() {
  return publicProcedure
    .input(validator.getPackTemplate)
    .query(async ({ input }) => {
      const param = input.id ? { id: input.id } : { name: input.name };
      return await getPackTemplateService(param);
    });
}
