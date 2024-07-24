import { protectedProcedure } from '../../trpc';
import { addItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';

export const addItem = async (c) => {
  try {
    const { name, weight, quantity, unit, packId, type, ownerId } =
      await c.req.json();

    const result = await addItemService(
      name,
      weight,
      quantity,
      unit,
      packId,
      type,
      ownerId,
    );
    return c.json({ result }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

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
      opts.ctx.executionCtx,
    );
    return result;
  });
}
