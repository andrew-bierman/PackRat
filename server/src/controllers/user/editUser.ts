import { publicProcedure } from '../../trpc';
import { UnableToEditUserError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import User from '../../models/userModel';
import * as validator from '../../middleware/validators/index';
import { TRPCError } from '@trpc/server';
/**
 * Edits a user.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.userId - The ID of the user to edit.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the edited user.
 */
export const editUser = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const editedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      returnOriginal: false,
    }).populate('favorites');
    res.locals.data = editedUser;
    responseHandler(res);
  } catch (error) {
    next(UnableToEditUserError);
  }
};

export function editUserRoute() {
  return publicProcedure
    .input(validator.editUser)
    .mutation(async (opts) => {
      try {
        const { userId } = opts.input;
        const editedUser = await User.findOneAndUpdate({ _id: userId }, opts.input, {
          returnOriginal: false,
        }).populate('favorites');
        return editedUser;
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      }
    });
}