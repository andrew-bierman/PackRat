import { editGlobalItemAsDuplicateService } from '../../services/item/item.service';
import { UnableToDeleteItemError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { z } from 'zod';
import { publicProcedure } from '../../trpc';

/**
 * Edit a global item by duplicating it with new changes.
 * @param {Object} req - The request object.
 * @param {Object} c.req.param() - The parameters object.
 * @param {string} c.req.param().itemId - The ID of the item to edit.
 * @param {Object} c.req.json() - The request body object.
 * @param {string} c.req.json().packId - The ID of the pack.
 * @param {string} c.req.json().name - The name of the item.
 * @param {number} c.req.json().weight - The weight of the item.
 * @param {number} c.req.json().quantity - The quantity of the item.
 * @param {string} c.req.json().unit - The unit of the item.
 * @param {string} c.req.json().type - The type of the item.
 * @param {Object} res - The response object.
 * @return {Object} The updated item.
 */
export const editGlobalItemAsDuplicate = async (c, next) => {
  try {
    const { itemId } = c.req.param();
    const { packId, name, weight, quantity, unit, type } = c.req.json();

    const newItem = await editGlobalItemAsDuplicateService(
      itemId,
      packId,
      name,
      weight,
      quantity,
      unit,
      type,
    );

    res.locals.data = newItem;
    responseHandler(c);
  } catch (error) {
    next(UnableToDeleteItemError);
  }
};

export function editGlobalItemAsDuplicateRoute() {
  return publicProcedure
    .input(
      z.object({
        itemId: z.string(),
        packId: z.string(),
        name: z.string(),
        weight: z.number(),
        quantity: z.number(),
        unit: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { itemId, packId, name, weight, quantity, unit, type } = opts.input;
      return await editGlobalItemAsDuplicateService(
        itemId,
        packId,
        name,
        weight,
        quantity,
        unit,
        type,
      );
    });
}
