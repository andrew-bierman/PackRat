import { publicProcedure } from '../../trpc';
import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import User from '../../models/userModel';
import { addTemplateService } from '../../services/template/template.service';
import { z } from 'zod';

/**
 * Adds a template to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The created template.
 */
export const addTemplate = async (c, next) => {
  const { type, templateId, isGlobalTemplate, createdBy } = c.req.json();

  const user = await User.findById(createdBy);

  if (!user) {
    next(UserNotFoundError);
  }

  await addTemplateService(type, templateId, isGlobalTemplate, createdBy);

  res.locals.data = { message: 'Template added successfully' };
  responseHandler(c);
};

export function addTemplateRoute() {
  return publicProcedure
    .input(
      z.object({
        type: z.string(),
        templateId: z.string(),
        isGlobalTemplate: z.boolean(),
        createdBy: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { type, templateId, isGlobalTemplate, createdBy } = opts.input;
      const user = await User.findById(createdBy);
      if (!user) {
        throw new Error(UserNotFoundError.message);
      }
      await addTemplateService(type, templateId, isGlobalTemplate, createdBy);
      return { message: 'Template added successfully' };
    });
}
