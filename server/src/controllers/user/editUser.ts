import { publicProcedure } from '../../trpc';
import { UnableToEditUserError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import User from '../../models/userModel';
import * as validator from '../../middleware/validators/index';
/**
 * Edits a user.
 * @param {Object} req - The request object.
 * @param {Object} c.req.json() - The body of the request.
 * @param {string} c.req.json().userId - The ID of the user to edit.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the edited user.
 */
export const editUser = async (c, next) => {
  try {
    const { userId } = c.req.json();

    const editedUser = await User.findOneAndUpdate(
      { _id: userId },
      c.req.json(),
      {
        returnOriginal: false,
      },
    ).populate('favorites');
    res.locals.data = editedUser;
    responseHandler(c);
  } catch (error) {
    next(UnableToEditUserError);
  }
};

export function editUserRoute() {
  return publicProcedure.input(validator.editUser).mutation(async (opts) => {
    const { userId } = opts.input;
    const editedUser = await User.findOneAndUpdate(
      { _id: userId },
      opts.input,
      {
        returnOriginal: false,
      },
    ).populate('favorites');
    return editedUser;
  });
}
