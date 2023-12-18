import { publicProcedure } from '../../trpc';

/**
 * Retrieves the user information and sends it as a response.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The user information.
 */
export const getMe = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

export function getMeRoute() {
  return publicProcedure.query(async (opts) => {
    const { user } : any = opts.ctx;
    return user
  });
}
