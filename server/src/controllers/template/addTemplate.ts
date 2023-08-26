import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import User from '../../models/userModel';
import { addTemplateService } from '../../services/template/template.service';

/**
 * Adds a template to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The created template.
 */
export const addTemplate = async (req, res, next) => {
  const { type, templateId, isGlobalTemplate, createdBy } = req.body;

  const user = await User.findById(createdBy);

  if (!user) {
    next(UserNotFoundError);
  }

  await addTemplateService(type, templateId, isGlobalTemplate, createdBy);

  res.locals.data = { message: 'Template added successfully' };
  responseHandler(res);
};
