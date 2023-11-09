import { publicProcedure } from '../../trpc';
import { UnableToEditUserError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import * as validator from '../../middleware/validators/index';
import { prisma } from '../../prisma';
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
    const {
      userId,
      favourite_ids,
      pack_ids,
      template_ids,
      trip_ids,
      item_id,
      ...rest
    } = opts.input;
    const editedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...rest,
        favorites: {
          connect: favourite_ids?.map((favourite) => ({ id: favourite })),
        },
        packs: {
          connect: pack_ids?.map((pack) => ({ id: pack })),
        },
        templates: {
          connect: template_ids?.map((template) => ({ id: template })),
        },
        item: { connect: { id: item_id } },
      },
      select: {
        favorites: true,
      },
    });

    return editedUser;
  });
}
