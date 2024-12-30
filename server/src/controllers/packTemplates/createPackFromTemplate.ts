import * as validator from '@packrat/validations';
import { createPackFromTemplateService } from '../../services/packTemplate/packTemplate.service';
import { protectedProcedure } from '../../trpc';

export function createPackFromTemplateRoute() {
  return protectedProcedure
    .input(validator.createPackFromTemplate)
    .mutation(async (opts) => {
      if (!opts.ctx.user) {
        throw new Error('User not authenticated');
      }
      const pack = await createPackFromTemplateService(
        opts.ctx.user.id,
        opts.input.packTemplateId,
        opts.input.newPackName,
        opts.ctx.executionCtx,
      );
      return pack;
    });
}
