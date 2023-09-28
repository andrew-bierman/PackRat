import { publicProcedure } from '../../trpc';
import { UnableToAddItemError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { addItemService } from '../../services/item/item.service';
import * as validator from '../../middleware/validators/index';
import { TRPCError } from '@trpc/server';

/**
 * Adds an item to the database based on the provided request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item and pack ID.
 */
export const addItem = async (req, res, next) => {
  try {
    const { name, weight, quantity, unit, packId, type, ownerId } = req.body;

    const result = await addItemService(
      name,
      weight,
      quantity,
      unit,
      packId,
      type,
      ownerId,
    );

    res.locals.data = { newItem: result.newItem, packId: result.packId };
    responseHandler(res);
  } catch (error) {
    next(UnableToAddItemError);
  }
};

export function addItemRoute() {
  return publicProcedure.input(validator.addItem)
    .mutation(async (opts) => {
      try {
        const { name, weight, quantity, unit, packId, type, ownerId } = opts.input;
        const result = await addItemService(name, weight, quantity, unit, packId, type, ownerId);
        return { newItem: result.newItem, packId: result.packId };
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: UnableToAddItemError.message });
      }
    });
}