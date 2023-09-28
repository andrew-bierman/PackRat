import { publicProcedure } from '../../trpc';
import Template from '../../models/templateModel';
import { TRPCError } from '@trpc/server';
import { InternalServerError } from '../../helpers/errors';

/**
 * Retrieves templates from the database and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} - The templates retrieved from the database.
 */
export const getTemplates = async (req, res) => {
  const templates = await Template.find({}).populate('createdBy', 'username');
  res.json(templates);
};

export function getTemplatesRoute() {
  return publicProcedure.query(async (opts) => {
    try {
      const templates = await Template.find({}).populate('createdBy', 'username');
      return templates;
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
    }
  })
}