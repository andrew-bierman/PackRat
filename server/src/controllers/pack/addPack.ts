import { addPackService } from '../../services/pack/pack.service';
import * as validator from '../../middleware/validators/index';
import { publicProcedure } from '../../trpc';

/**
 * Adds a new pack to the database.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Promise} A promise that resolves to the created pack.
 */
// export const addPack = async (req, res) => {
//   const { name, owner_id } = req.body;
//   const result = await addPackService(name, owner_id);
//   res.status(200).json({ msg: 'success', ...result });
// };

export function addPackRoute() {
  return publicProcedure.input(validator.addPack).mutation(async (opts) => {
    try {
      const {name, owner_id, is_public} = opts.input;
      const pack = await addPackService(name, owner_id, is_public);
      return pack;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });
}
