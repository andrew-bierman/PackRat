import { TemplateNotFoundError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
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
      res.locals.data = { message: "Template deleted successfully" };
      responseHandler(res);
    } else {
      next(TemplateNotFoundError);
    }
  
};
