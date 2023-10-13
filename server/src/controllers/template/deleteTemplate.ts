import { publicProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
import Template from '../../models/templateModel';
import { z } from 'zod';

/**
 * Deletes a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the template is deleted.
 */
export const deleteTemplate = async (c, next) => {
  const { templateId } = c.req.param();

  const template: any = await Template.findById(templateId);

  if (template) {
    await template.remove();
    res.json({ message: 'Template removed' });
  } else {
    next(TemplateNotFoundError);
  }
};

export function deleteTemplateRoute() {
  return publicProcedure
    .input(z.object({ templateId: z.string() }))
    .mutation(async (opts) => {
      const { templateId } = opts.input;
      const template: any = await Template.findById(templateId);
      if (template) {
        await template.remove();
        return { message: 'Template removed' };
      } else {
        throw new Error(TemplateNotFoundError.message);
      }
    });
}
