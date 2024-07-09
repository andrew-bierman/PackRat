import { publicProcedure, protectedProcedure } from '../../trpc';
import { searchItemsByNameService } from '../../services/item/item.service';
import { z } from 'zod';

/**
 * Searches for items by name.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query string parameters.
 * @param {string} req.query.name - The name to search for.
 * @param {Object} res - The response object.
 * @return {Array} An array of items matching the search criteria.
 */
// const JoiObjectId = (message: any = 'valid id'): z.ZodString =>
//   z.string().regex(/^[0-9a-fA-F]{24}$/, { message });

// export const searchItemsByName = async (req, res, next) => {
//   try {
//     const { name, packId } = req.query;

//     const items = await searchItemsByNameService(name, packId);

//     res.status(200).json(items);
//   } catch (error) {
//     next(ItemNotFoundError);
//   }
// };

export function searchItemsByNameRoute() {
  return protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      const { name } = opts.input;
      const items = await searchItemsByNameService(name);
      return items;
    });
}
