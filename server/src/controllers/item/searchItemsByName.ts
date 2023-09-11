import { publicProcedure } from '../../trpc';
import { ItemNotFoundError } from '../../helpers/errors';
import { searchItemsByNameService } from '../../services/item/item.service';
import * as validator from '../../../../packages/src/validations';


/**
 * Searches for items by name.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query string parameters.
 * @param {string} req.query.name - The name to search for.
 * @param {Object} res - The response object.
 * @return {Array} An array of items matching the search criteria.
 */

export const searchItemsByName = async (req, res, next) => {
  try {
    const { name } = req.query;

    const items = await searchItemsByNameService(name);

    res.status(200).json(items);
  } catch (error) {
    next(ItemNotFoundError);
  }
};

export function searchItemsByNameRoute() {
  return publicProcedure.input(validator.getItemByName)
    .query(async (opts) => {
      const { name } = opts.input;
      return searchItemsByNameService(name);
    });
}
