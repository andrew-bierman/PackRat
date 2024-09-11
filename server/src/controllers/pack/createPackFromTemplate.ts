import * as validator from '@packrat/validations';
import { createPackFromTemplateService } from 'src/services/packTemplate/createPackFromTemplateService';
import { protectedProcedure } from 'src/trpc';

export function createPackFromTemplateRoute() {
  return protectedProcedure
    .input(validator.createPackFromTemplate)
    .mutation(async (opts) => {
      const pack = await createPackFromTemplateService(
        opts.ctx.user.id,
        opts.input.packId,
      );
      return pack;
    });
}
