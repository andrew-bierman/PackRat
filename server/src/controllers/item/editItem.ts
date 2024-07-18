import { protectedProcedure } from '../../trpc';
import { editItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';

export const editItem = async (c) => {
  try {
    const { id, name, weight, unit, quantity, type } = await c.req.parseBody();

    const item = await editItemService(id, name, weight, unit, quantity, type);
    return c.json({ item }, 200);
  } catch (error) {
    return c.json({ error: `Failed to edit item: ${error.message}` }, 500);
  }
};

export function editItemRoute() {
  return protectedProcedure.input(validator.editItem).mutation(async (opts) => {
    const { id, name, weight, unit, quantity, type } = opts.input;

    if (type !== 'Food' && type !== 'Water' && type !== 'Essentials') {
      throw new Error('Invalid item type');
    }

    const item = await editItemService(id, name, weight, unit, quantity, type);
    return item;
  });
}
