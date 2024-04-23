import { publicProcedure } from '../../trpc';
import { UnableToEditPackError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { editPackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';

/**
 * Edits a pack in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated pack.
 */

// export const editPack = async (req, res, next) => {
//   try {
//     const { id } = req.body;

//     const newPack = await editPackService(id, req.body);

//     res.locals.data = newPack;
//     responseHandler(res);
//   } catch (error) {
//     next(UnableToEditPackError);
//   }
// };

export function editPackRoute() {
  return publicProcedure.input(validator.editPack).mutation(async (opts) => {
    const packData = opts.input;
    const pack = await editPackService(packData);
    return pack;
  });
}
