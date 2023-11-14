import { publicProcedure } from '../../trpc';
import { UnableToEditUserError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import * as validator from '../../middleware/validators/index';
import {prisma} from "../../prisma/index"
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

    const editedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: req.body,
      select: {
        favorites: true,
      },
    });
    
    res.locals.data = editedUser;
    responseHandler(res);
  } catch (error) {
    next(UnableToEditUserError);
  }
};

export function editUserRoute() {
  return publicProcedure.input(validator.editUser).mutation(async (opts) => {
    const { userId } = opts.input;
    const editedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: opts.input,
      select: {
        favorites: true,
      },
    });
    
    return editedUser;
  });
}
