import { publicProcedure } from '../../trpc';
import { UnableToEditItemError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { editItemService } from '../../services/item/item.service';
import * as validator from '../../middleware/validators/index';
import { Item } from '../../prisma/methods';

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
  return publicProcedure.input(validator.editItem).mutation(async (opts) => {
    const { id, name, weight, unit, quantity, type } = opts.input;
    const { prisma }: any = opts.ctx;
    const item = await editItemService(
      prisma,
      id,
      name,
      weight,
      unit,
      quantity,
      type,
    );
    return Item(item)?.toJSON();
  });
}
