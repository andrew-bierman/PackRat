import { protectedProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import { User } from '../../drizzle/methods/User';

export const getUsers = async (c) => {
  try {
    const userClass = new User();
    const users = await userClass.findMany();
    if (!c.locals) c.locals = {};
    c.locals.data = users;
    return responseHandler(c);
  } catch (error) {
    return c.json({ error: `Failed to get users: ${error.message}` }, 500);
  }
};

export function getUsersRoute() {
  return protectedProcedure.query(async (opts) => {
    const userClass = new User();
    const users = await userClass.findMany();
    return users;
  });
}
