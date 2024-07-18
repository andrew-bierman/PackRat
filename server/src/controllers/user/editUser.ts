import { publicProcedure, protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { hashPassword } from '../../utils/user';

export const editUser = async (c) => {
  try {
    let {
      id,
      name,
      email,
      code,
      role,
      username,
      profileImage,
      preferredWeather,
      preferredWeight,
      password,
    } = await c.req.json();

    const JWT_SECRET = c.env.JWT_SECRET;
    const userClass = new User();
    if (password) {
      password = await hashPassword(JWT_SECRET, password);
    }
    const data = {
      id,
      ...(name && { name }),
      ...(password && { password }),
      ...(email && { email }),
      ...(code && { code }),
      ...(role && { role }),
      ...(username && { username }),
      ...(profileImage && { profileImage }),
      ...(preferredWeather && { preferredWeather }),
      ...(preferredWeight && { preferredWeight }),
    };
    const editedUser = await userClass.update(data);
    return c.json({ editedUser }, 200);
  } catch (error) {
    console.error('Error editing user:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
};

export function editUserRoute() {
  return protectedProcedure.input(validator.editUser).mutation(async (opts) => {
    const {
      id,
      name,
      email,
      code,
      role,
      username,
      profileImage,
      preferredWeather,
      preferredWeight,
    } = opts.input;
    let { password } = opts.input;
    const { env }: any = opts.ctx;
    const JWT_SECRET = env.JWT_SECRET;
    const userClass = new User();
    if (password) {
      password = await hashPassword(JWT_SECRET, password);
    }
    const data = {
      id,
      ...(name && { name }),
      ...(password && { password }),
      ...(email && { email }),
      ...(code && { code }),
      ...(role && { role }),
      ...(username && { username }),
      ...(profileImage && { profileImage }),
      ...(preferredWeather && { preferredWeather }),
      ...(preferredWeight && { preferredWeight }),
    };
    const editedUser = await userClass.update(data);
    return editedUser;
  });
}
