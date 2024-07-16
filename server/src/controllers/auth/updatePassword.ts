import { publicProcedure, protectedProcedure } from '../../trpc';
import { findUserAndUpdate } from '../../services/user/user.service';
import * as validator from '@packrat/validations';
import { hashPassword } from '../../utils/user';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';
// import { prisma } from '../../prisma';

/**
 * Updates the password for a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
// export const updatePassword = async (req, res, next) => {
//   try {
//     let { email, oldPassword, newPassword } = req.body;

//     const user = await prisma.user.findFirst({
//       where: {
//         email,
//       },
//     });

//     if (!user) throw new Error('Unable to verify');

//     const isMatch = await bcrypt.compare(oldPassword, user.password);

//     if (!isMatch) throw new Error('Incorrect password');

//     const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));

//     newPassword = await bcrypt.hash(newPassword, salt);

//     const val = await findUserAndUpdate(email, newPassword, 'password');

//     if (val) {
//       responseHandler(res);
//     } else {
//       next(UnableTouUpdatePasswordError);
//     }
//   } catch (error) {
//     next(UnableTouUpdatePasswordError);
//   }
// };

export async function updatePassword(ctx: Context) {
  const { email, password } = await ctx.req.json();
  const { env }: any = ctx;
  const JWT_SECRET = env.JWT_SECRET;
  const hashedPassword = await hashPassword(JWT_SECRET, password);
  const user = await findUserAndUpdate(email, hashedPassword, 'password');
  if (!user) {
    ctx.set('errror', { error: 'User with these cridentals not found' });
    return await responseHandler(ctx);
  }
  ctx.set('data', user);
  return await responseHandler(ctx);
}

export function updatePasswordRoute() {
  return protectedProcedure
    .input(validator.updatePassword)
    .mutation(async (opts) => {
      const { email, password } = opts.input;
      const { env }: any = opts.ctx;
      const JWT_SECRET = env.JWT_SECRET;
      const hashedPassword = await hashPassword(JWT_SECRET, password);
      const user = await findUserAndUpdate(email, hashedPassword, 'password');
      return user;
    });
}
