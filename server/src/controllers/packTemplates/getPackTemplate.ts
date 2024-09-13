import { protectedProcedure } from 'src/trpc';
import { getPackTemplateService } from 'src/services/packTemplate/packTemplate.service';
import { z } from 'zod'; // TODO (pack-template) - move to @packrat/validations

export function getPackTemplateRoute() {
  return protectedProcedure
    .input(z.string().min(1))
    .query(async ({ input: packTemplateId }) => {
      return await getPackTemplateService(packTemplateId);
    });
}
