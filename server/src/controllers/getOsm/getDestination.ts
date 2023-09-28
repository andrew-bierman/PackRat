import { publicProcedure } from '../../trpc';
import { InternalServerError, NoDestinationFoundWithThatIDError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getDestinationService } from '../../services/osm/osm.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

/**
 * Retrieves the destination based on the given ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The retrieved destination.
 */
export const getDestination = async (req, res, next) => {
  const id = req.params.id;

  const destination = await getDestinationService(id);

  if (!destination) {
    next(NoDestinationFoundWithThatIDError);
  }

  res.locals.data = destination;
  responseHandler(res);
};

export function getDestinationRoute() {
  return publicProcedure.input(z.object({ id: z.string() })).query(async (opts) => {
    try {
      const { id } = opts.input;
      const destination = await getDestinationService(id);
      if (!destination) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: NoDestinationFoundWithThatIDError.message });
      return destination
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
    }
  })
}