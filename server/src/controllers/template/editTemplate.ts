import { publicProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import Template from '../../models/templateModel';
import { editTemplateService } from '../../services/template/template.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { InternalServerError } from '../../helpers/errors';

/**
 * Edits a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the template is edited.
 */
export const editTemplate = async (req, res) => {
  const { templateId } = req.params;
  const { type, isGlobalTemplate } = req.body;
  const updatedTemplate = await editTemplateService(
    templateId,
    type,
    isGlobalTemplate,
  );
  res.locals.data = updatedTemplate;
  responseHandler(res);
};

export function editTemplateRoute() {
  return publicProcedure
    .input(z.object({ templateId: z.string(), type: z.string(), isGlobalTemplate: z.boolean() }))
    .mutation(async (opts) => {
      try {
        const { templateId, type, isGlobalTemplate } = opts.input;
        const updatedTemplate = await editTemplateService(
          templateId,
          type,
          isGlobalTemplate,
        );
        return updatedTemplate;
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
      }
    });
}