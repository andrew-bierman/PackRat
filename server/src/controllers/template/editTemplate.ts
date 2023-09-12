import { publicProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import Template from '../../models/templateModel';
import { editTemplateService } from '../../services/template/template.service';
import * as validators from "@packrat/packages"
import { authorizedProcedure } from '../../middleware/authorizedProcedure';
import { adminProcedure } from '../../middleware/isAdmin';

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
  return adminProcedure
    .input(validators.editTemplate)
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