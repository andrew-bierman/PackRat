import { publicProcedure, protectedProcedure } from '../../trpc';
import { editItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';

// export const editItem = async (req, res, next) => {
//   try {
//     const { id, name, weight, unit, quantity, type } = req.body;

//     const newItem = await editItemService(
//       id,
//       name,
//       weight,
//       unit,
//       quantity,
//       type,
//     );

//     res.locals.data = newItem;
//     responseHandler(res);
//   } catch (error) {
//     next(UnableToEditItemError);
//   }
// };

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
