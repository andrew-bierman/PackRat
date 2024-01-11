import { UnableToSendCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { emailExistsService } from '../../services/user/emailExistsService';
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
    if (result?.status) {
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
  return publicProcedure.input(validator.emailExists).mutation(async (opts) => {
    return await emailExistsService(opts.input);
  });
}
