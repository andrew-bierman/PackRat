import { protectedProcedure } from '../../trpc';
import { editTemplateService } from '../../services/template/template.service';
import * as validator from '@packrat/validations';

export const editTemplate = async (c) => {
  try {
    const { templateId, type, isGlobalTemplate } = await c.req.parseBody();
    const updatedTemplate = await editTemplateService(
      templateId,
      type,
      isGlobalTemplate,
    );
    return c.json({ updatedTemplate }, 200);
  } catch (error) {
    return c.json({ error: `Failed to edit template: ${error.message}` }, 500);
  }
};

export function editTemplateRoute() {
  return protectedProcedure
    .input(validator.editTemplate)
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
