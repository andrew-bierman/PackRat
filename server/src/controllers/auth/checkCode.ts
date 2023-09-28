import { publicProcedure } from '../../trpc';
import { InternalServerError, InvalidCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import * as validator from '@packrat/packages';
import { checkCodeService } from '../../services/user/checkCodeService';
import { TRPCError } from '@trpc/server';
/**
 * Checks the provided code against the user's email in the database.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - a promise that resolves to void
 */
export const checkCode = async (req: any, res: any, next) => {
  const user = await checkCodeService(req.body);
  if (user.length) {
    responseHandler(res);
  } else {
    next(InvalidCodeError);
  }
};

export function checkCodeRoute() {
  return publicProcedure
    .input(validator.checkCode)
    .mutation(async (opts) => {
      try {
        const user = await checkCodeService(opts.input);
        if (user.length) {
          return user
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InvalidCodeError.message });
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
      }
    });
}