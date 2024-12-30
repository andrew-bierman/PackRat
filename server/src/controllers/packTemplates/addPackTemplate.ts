import { addPackTemplateService } from '../../services/packTemplate/packTemplate.service';
import * as validator from '@packrat/validations';
import { publicProcedure } from '../../trpc';

export function importPackTemplatesRoute() {
  return publicProcedure
    .input(validator.addPackTemplates)
    .mutation(async (opts) => {
      const array = opts.input;
      const packTemplates: any[] = [];
      for (let idx = 0; idx < array.length; idx++) {
        const input = array[idx];
        try {
          const packTemplate = await addPackTemplateService(
            input,
            opts.ctx.executionCtx,
          );
          packTemplates.push(packTemplate);
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      return packTemplates;
    });
}

export function addPackTemplateRoute() {
  return publicProcedure
    .input(validator.addPackTemplate)
    .mutation(async (opts) => {
      const packTemplate = await addPackTemplateService(
        opts.input,
        opts.ctx.executionCtx,
      );
      return packTemplate;
    });
}
