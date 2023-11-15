import { publicProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';

import { editTemplateService } from '../../services/template/template.service';
import { z } from 'zod';

import { prisma } from '../../prisma';
import { TemplateType } from '@prisma/client/edge';

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
    .input(
      z.object({
        templateId: z.string(),
        type: z.nativeEnum(TemplateType),
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
