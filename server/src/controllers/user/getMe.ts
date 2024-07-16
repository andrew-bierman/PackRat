import { getUserByTokenService } from '../../services/user/getUserByToken';
import { protectedProcedure } from '../../trpc';

/**
 * Retrieves the user information and sends it as a response.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The user information.
 */
export const getMe = async (c) => {
  try {
    const { user } = c;
    return c.json({ user }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get user: ${error.message}` }, 500);
  }
};

export function getMeRoute() {
  return protectedProcedure.query(async (opts) => {
    const { user } = opts.ctx;
    return user;
  });
}
