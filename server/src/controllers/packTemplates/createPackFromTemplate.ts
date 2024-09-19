import * as validator from '@packrat/validations';
import { createPackFromTemplateService } from 'src/services/packTemplate/packTemplate.service';
import { protectedProcedure } from 'src/trpc';

export function createPackFromTemplateRoute() {
  return protectedProcedure
    .input(validator.createPackFromTemplate)
    .mutation(async (opts) => {
      const pack = await createPackFromTemplateService(
        opts.ctx.user.id,
        opts.input.packTemplateId,
        opts.input.newPackName,
        opts.ctx.executionCtx,
      );
      return pack;
    });
}
