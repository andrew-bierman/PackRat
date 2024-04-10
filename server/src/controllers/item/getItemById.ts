import { publicProcedure } from '../../trpc';
import { getItemByIdService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';

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

export function getItemByIdRoute() {
  return publicProcedure.input(validator.getItemById).query(async (opts) => {
    const { id } = opts.input;
    const item = await getItemByIdService(id);
    return item;
  });
}
