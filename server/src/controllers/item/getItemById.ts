import { publicProcedure, protectedProcedure } from '../../trpc';
import { getItemByIdService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Retrieves an item by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.id - The ID of the item to retrieve.
 * @return {Object} The retrieved item.
 */
// export const getItemById = async (req, res, next) => {
//   try {
//     const { id } = req.body;

//     const item = await getItemByIdService(id);

//     res.locals.data = item;
//     responseHandler(res);
//   } catch (error) {
//     next(ItemNotFoundError);
//   }
// };

export async function getItemById(ctx: Context) {
  try {
    const { id } = await ctx.req.param();
    const item = await getItemByIdService(id);
    ctx.set('data', item);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getItemByIdRoute() {
  return protectedProcedure.input(validator.getItemById).query(async (opts) => {
    const { id } = opts.input;
    const item = await getItemByIdService(id);
    return item;
  });
}
