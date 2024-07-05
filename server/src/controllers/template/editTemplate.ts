import { publicProcedure, protectedProcedure } from '../../trpc';
import { editTemplateService } from '../../services/template/template.service';
import { z } from 'zod';

/**
 * Edits a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the template is edited.
 */
// export const editTemplate = async (req, res) => {
//   const { templateId } = req.params;
//   const { type, isGlobalTemplate } = req.body;
//   const updatedTemplate = await editTemplateService(
//     templateId,
//     type,
//     isGlobalTemplate,
//   );
//   res.locals.data = updatedTemplate;
//   responseHandler(res);
// };

export function editTemplateRoute() {
  return protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        type: z.any(),
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
