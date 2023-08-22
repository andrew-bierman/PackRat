import { TemplateNotFoundError } from "../../helpers/errors";
import Template from "../../models/templateModel";

/**
 * Retrieves a template by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the template or rejects with an error.
 */
export const getTemplateById = async (req, res, next) => {
  const { templateId } = req.params;

  const template = await Template.findById(templateId).populate(
    "createdBy",
    "username"
  );
  if (template) {
    res.json(template);
  } else {
    next(TemplateNotFoundError)
  }

};
