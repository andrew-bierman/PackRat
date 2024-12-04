import * as validator from '@packrat/validations';
import { protectedProcedure } from 'src/trpc';
import { getPackTemplateService } from 'src/services/packTemplate/packTemplate.service';

export function getPackTemplateRoute() {
  return protectedProcedure
    .input(validator.getPackTemplate)
    .query(async ({ input }) => {
      return await getPackTemplateService(input.id);
    });
}
