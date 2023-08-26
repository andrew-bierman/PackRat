import { TemplateNotFoundError } from "../../helpers/errors";
import Template from "../../models/templateModel";

/**
 * Deletes a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the template is deleted.
 */
export const deleteTemplate = async (req, res,next) => {
  const { templateId } = req.params;

    const template: any = await Template.findById(templateId);

    if (template) {
      await template.remove();
      res.json({ message: 'Template removed' });
    } else {
      next(TemplateNotFoundError);
    }
  
};
