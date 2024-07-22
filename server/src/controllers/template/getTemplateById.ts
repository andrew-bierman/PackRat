import { protectedProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
import * as validator from '@packrat/validations';
import { Template } from '../../drizzle/methods/template';

export const getTemplateById = async (c) => {
  try {
    const { templateId } = await c.req.param();
    const templateClass = new Template();
    const template = await templateClass.findTemplate(templateId, true);
    return c.json({ template }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getTemplateByIdRoute() {
  const templateClass = new Template();
  return protectedProcedure
    .input(validator.getTemplateById)
    .query(async (opts) => {
      const { templateId } = opts.input;
      const template = await templateClass.findTemplate(templateId, true);
      if (!template) {
        throw new Error(TemplateNotFoundError.message);
      }
      return template;
    });
}
