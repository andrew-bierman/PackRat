import { protectedProcedure } from '../../trpc';
import { addItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';

export const importItems = async (c) => {
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

export function importItemsRoute() {
  return protectedProcedure
    .input(validator.importItem)
    .mutation(async (opts) => {
      console.log('opsssssssssssssssssssssssts', opts.input);
      // const result = await addItemService(
      //   name,
      //   weight,
      //   quantity,
      //   unit,
      //   packId,
      //   type,
      //   ownerId,
      //   opts.ctx.executionCtx,
      // );
      return 'result';
    });
}
