import { publicProcedure, protectedProcedure } from '../../trpc';
import { deleteGlobalItemService } from '../../services/item/item.service';
import { z } from 'zod';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Deletes a global item.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
// export const deleteGlobalItem = async (req, res, next) => {
//   try {
//     const { itemId } = req.params;

//     const itemDeleted = await deleteGlobalItemService(itemId);

//     res.locals.data = itemDeleted;
//     responseHandler(res);
//   } catch (error) {
//     next(UnableToDeleteItemError);
//   }
// };

export async function deleteGlobalItem(ctx: Context) {
  try {
    const { itemId } = await ctx.req.param();
    ctx.set('data', await deleteGlobalItemService(itemId));
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function deleteGlobalItemRoute() {
  return protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { itemId } = opts.input;
      return await deleteGlobalItemService(itemId);
    });
}
