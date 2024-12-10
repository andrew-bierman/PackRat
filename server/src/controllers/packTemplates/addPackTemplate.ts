import { addPackTemplateService } from '../../services/packTemplate/packTemplate.service';
import * as validator from '@packrat/validations';
import { publicProcedure } from '../../trpc';
import { th } from '@faker-js/faker';

export function importPackTemplatesRoute() {
  return publicProcedure
    .input(validator.addPackTemplates)
    .mutation(async (opts) => {
      const array = opts.input;
      const packTemplates = [];
      for (let idx = 0; idx < array.length; idx++) {
        const { name, description, type, itemPackTemplates } = array[idx];
        try {
          const template = await addPackTemplateService({
            name,
            description,
            type,
            itemPackTemplates,
          });
          packTemplates.push(template);
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    });
}

export function addPackTemplateRoute() {
  return publicProcedure
    .input(validator.addPackTemplate)
    .mutation(async (opts) => {
      const { name, description, type, itemPackTemplates } = opts.input;
      const packTemplate = await addPackTemplateService({
        name,
        description,
        type,
        itemPackTemplates
      });
      return packTemplate;
    });
}
