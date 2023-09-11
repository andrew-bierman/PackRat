import { publicProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Template from '../../models/templateModel';
import * as validators from "../../../../packages/src/validations"
/**
 * Retrieves a template by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the template or rejects with an error.
 */
export const getTemplateById = async (req, res, next) => {
  const { templateId } = req.params;

  const template = await Template.findById(templateId).populate(
    'createdBy',
    'username',
  );
  if (template) {
    res.locals.data = template;
    responseHandler(res);
  } else {
    next(TemplateNotFoundError);
  }
};

export function getTemplateByIdRoute() {
 return publicProcedure.input(validators.getTemplateById).query(async (opts) => {
    const { templateId } = opts.input;
    const template = await Template.findById(templateId).populate(
      'createdBy',
      'username',
    );
    return template
  })
}