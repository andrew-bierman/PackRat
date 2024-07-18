import { publicProcedure, protectedProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
import * as validator from '@packrat/validations';
import { Template } from '../../drizzle/methods/template';

export const deleteTemplate = async (c) => {
  try {
    const { templateId } = await c.req.parseBody();
    const templateClass = new Template();
    const template = await templateClass.findTemplate(templateId);
    if (template) {
      await templateClass.delete(templateId);
      return c.json({ message: 'Template removed' }, 200);
    } else {
      return c.json({ error: TemplateNotFoundError.message }, 404);
    }
  } catch (error) {
    return c.json(
      { error: `Failed to delete template: ${error.message}` },
      500,
    );
  }
};

export function deleteTemplateRoute() {
  const templateClass = new Template();
  return protectedProcedure
    .input(validator.deleteTemplate)
    .mutation(async (opts) => {
      const { templateId } = opts.input;
      const template = await templateClass.findTemplate(templateId);
      if (template) {
        await templateClass.delete(templateId);
        return { message: 'Template removed' };
      } else {
        throw new Error(TemplateNotFoundError.message);
      }
    });
}
