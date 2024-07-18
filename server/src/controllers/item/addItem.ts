import { publicProcedure, protectedProcedure } from '../../trpc';
import { addItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import { Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Adds an item to the database based on the provided request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item and pack ID.
 */
// export const addItem = async (req, res, next) => {
//   try {
//     const { name, weight, quantity, unit, packId, type, ownerId } = req.body;

//     const result = await addItemService(
//       name,
//       weight,
//       quantity,
//       unit,
//       packId,
//       type,
//       ownerId,
//     );

//     res.locals.data = { newItem: result.newItem, packId: result.packId };
//     responseHandler(res);
//   } catch (error) {
//     next(UnableToAddItemError);
//   }
// };

export async function addItem(ctx: Context) {
  try {
    const { name, weight, quantity, unit, packId, type, ownerId } =
      await ctx.req.json();

    if (type !== 'Food' && type !== 'Water' && type !== 'Essentials') {
      throw new Error('Invalid item type');
    }

    const result = await addItemService(
      name,
      weight,
      quantity,
      unit,
      packId,
      type,
      ownerId,
    );
    if (!result) {
      ctx.set('data', { data: 'cannot add item' });
      return await responseHandler(ctx);
    }
    ctx.set('data', result);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function addItemRoute() {
  return protectedProcedure.input(validator.addItem).mutation(async (opts) => {
    const { name, weight, quantity, unit, packId, type, ownerId } = opts.input;

    if (type !== 'Food' && type !== 'Water' && type !== 'Essentials') {
      throw new Error('Invalid item type');
    }

    const result = await addItemService(
      name,
      weight,
      quantity,
      unit,
      packId,
      type,
      ownerId,
    );
    return result;
  });
}
