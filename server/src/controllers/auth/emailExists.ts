import { InternalServerError, UnableToSendCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/packages';
import { emailExistsService } from '../../services/user/emailExistsService';
import { TRPCError } from '@trpc/server';
/**
 * Check if the provided email exists in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
export const emailExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = await emailExistsService({ email });
    if (result && result.status) {
      responseHandler(res);
    } else {
      next(result);
    }
  } catch (error) {
    if (error === UnableToSendCodeError) {
      next(error);
    } else {
      next(error);
    }
  }
};

export function emailExistsRoute() {
  return publicProcedure
    .input(validator.emailExists)
    .mutation(async (opts) => {
      try {
        const result = await emailExistsService(opts.input);
        if (result && result.status) {
          return result;
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: UnableToSendCodeError.message });
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
      }
    });
}