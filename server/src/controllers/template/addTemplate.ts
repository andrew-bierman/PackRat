import { publicProcedure } from '../../trpc';
import { InternalServerError, UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import User from '../../models/userModel';
import { addTemplateService } from '../../services/template/template.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

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

export function addTemplateRoute() {
  return publicProcedure
    .input(z.object({ type: z.string(), templateId: z.string(), isGlobalTemplate: z.boolean(), createdBy: z.string() }))
    .mutation(async (opts) => {
      try {
        const { type, templateId, isGlobalTemplate, createdBy } = opts.input;
        const user = await User.findById(createdBy);
        if (!user) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: UserNotFoundError.message });
        }
        await addTemplateService(type, templateId, isGlobalTemplate, createdBy);
        return { message: 'Template added successfully' };
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
      }
    });
}