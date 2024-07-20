import { publicProcedure, protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';

export const deleteUser = async (c) => {
  try {
    const { userId } = await c.req.json();
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
