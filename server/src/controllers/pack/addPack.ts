import { addPackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';
import { publicProcedure } from '../../trpc';

/**
 * Adds a new pack to the database.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Promise} A promise that resolves to the created pack.
 */

// export const addPack = async (req, res) => {
//  const { name, owner_id, is_public } = req.body;
//  const result = await addPackService(name, owner_id, is_public);
//  res.status(200).json({ msg: 'success', ...result });
// };

export function addPackRoute() {
  return publicProcedure.input(validator.addPack).mutation(async (opts) => {
    const { name, owner_id, is_public } = opts.input;
    const pack = await addPackService(
      name,
      owner_id,
      is_public,
      opts.ctx.executionCtx,
    );
    return pack;
  });
}
