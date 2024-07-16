import { publicProcedure, protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';

/**
 * Deletes a user from the database.
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the message "user was deleted successfully" if the user is deleted, or rejects with an error message if there is an error.
 */
export const deleteUser = async (c) => {
  try {
    const { userId } = await c.req.parseBody();
    const user = new User();
    await user.delete(userId);
    return c.json({ message: 'User deleted successfully' }, 200);
  } catch (error) {
    return c.json({ error: `Failed to delete user: ${error.message}` }, 500);
  }
};

export function deleteUserRoute() {
  return protectedProcedure
    .input(validator.deleteUser)
    .mutation(async (opts) => {
      const { userId } = opts.input;
      const user = new User();
      await user.delete(userId);
      return 'User deleted successfully';
    });
}
