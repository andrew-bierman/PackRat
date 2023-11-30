import { addPackService } from '../../services/pack/pack.service';
import * as validator from '../../middleware/validators/index';
import { publicProcedure } from '../../trpc';
import { Pack } from '../../prisma/methods';
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
    const { name, owner_id } = opts.input;
    const { prisma }: any = opts.ctx;
    const pack = await addPackService(prisma, name, owner_id);
    return Pack(pack)?.toJSON();
  });
}
