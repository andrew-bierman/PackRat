import { publicProcedure } from '../../trpc';
import { InternalServerError, TemplateNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Template from '../../models/templateModel';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
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
  return publicProcedure.input(z.object({ templateId: z.string() })).query(async (opts) => {
    try {
      const { templateId } = opts.input;
      const template = await Template.findById(templateId).populate(
        'createdBy',
        'username',
      );
      return template
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
    }
  })
}