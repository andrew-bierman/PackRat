import { publicProcedure, protectedProcedure } from '../../trpc';
import { NoDestinationFoundWithThatIDError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getDestinationService } from '../../services/osm/osm.service';
import { z } from 'zod';
import { Context } from 'hono';

// /**
//  * Retrieves the destination based on the given ID.
//  * @param {object} req - The request object.
//  * @param {object} res - The response object.
//  * @return {object} The retrieved destination.
//  */
// export const getDestination = async (req, res, next) => {
//   const id = req.params.id;

//   const destination = await getDestinationService(id);

//   if (!destination) {
//     next(NoDestinationFoundWithThatIDError);
//   }

//   res.locals.data = destination;
//   responseHandler(res);
// };

export async function getDestination(ctx: Context) {
  try {
    const { id } = await ctx.req.param();
    const response = await getDestinationService(id);
    if (!response) {
      ctx.set('data', { error: 'No Destination Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', response);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getDestinationRoute() {
  return protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { id } = opts.input;
      return await getDestinationService(id);
    });
}
