import { publicProcedure } from '../../trpc';
import { UnableToEditPackError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { editPackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/packages';

/**
 * Edits a pack in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated pack.
 */

export const editPack = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const newPack = await editPackService(_id, req.body);

    console.log('newPack', newPack);

    res.locals.data = newPack;
    responseHandler(res);
  } catch (error) {
    next(UnableToEditPackError);
  }
};

export function editPackRoute() {
  return publicProcedure.input(validator.editPack).mutation(async (opts) => {
    const { _id } = opts.input;
    return await editPackService(_id, opts.input);
  });
}