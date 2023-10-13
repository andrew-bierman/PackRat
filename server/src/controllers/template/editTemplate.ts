import { publicProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import Template from '../../models/templateModel';
import { editTemplateService } from '../../services/template/template.service';
import { z } from 'zod';

/**
 * Edits a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the template is edited.
 */
export const editTemplate = async (c) => {
  const { templateId } = c.req.param();
  const { type, isGlobalTemplate } = c.req.json();
  const updatedTemplate = await editTemplateService(
    templateId,
    type,
    isGlobalTemplate,
  );
  res.locals.data = updatedTemplate;
  responseHandler(c);
};

export function editTemplateRoute() {
  return publicProcedure
    .input(
      z.object({
        templateId: z.string(),
        type: z.string(),
        isGlobalTemplate: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { templateId, type, isGlobalTemplate } = opts.input;
      const updatedTemplate = await editTemplateService(
        templateId,
        type,
        isGlobalTemplate,
      );
      return updatedTemplate;
    });
}
