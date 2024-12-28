import * as validator from '@packrat/validations';
import { protectedProcedure } from '../../trpc';
import { getPackTemplateService } from '../../services/packTemplate/packTemplate.service';

export function getPackTemplateRoute() {
  return protectedProcedure
    .input(validator.getPackTemplate)
    .query(async ({ input }) => {
      const param = input.id
        ? { id: input.id }
        : { name: input.name as string };
      return await getPackTemplateService(param);
    });
}
