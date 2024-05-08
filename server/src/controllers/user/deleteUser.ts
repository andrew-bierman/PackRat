import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';

/**
 * Deletes a user from the database.
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the message "user was deleted successfully" if the user is deleted, or rejects with an error message if there is an error.
 */
// export const deleteUser = async (req, res, next) => {
//   try {
//     const { userId } = req.body;

//     await prisma.user.delete({
//       where: {
//         id: userId,
//       },
//     });

//     res.locals.data = { message: 'User deleted successfully' };
//     responseHandler(res);
//   } catch (error) {
//     next(UnableToEditUserError);
//   }
// };

export function deleteUserRoute() {
  return publicProcedure.input(validator.deleteUser).mutation(async (opts) => {
    const { userId } = opts.input;
    const user = new User();
    await user.delete(userId);
    return 'User deleted successfully';
  });
}
