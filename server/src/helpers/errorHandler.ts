import type express from 'express';
import { ERRORS } from './errorClasses';

/**
 * Handles errors that occur during the execution of a request.
 * @param {any} error - The error object that occurred.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function in the middleware chain.
 */
export function errorHandler(
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.error(error);

  // Check for new class-based errors
  if (error.errorType) {
    const mappedError = ERRORS[error.errorType] || ERRORS.AppError;
    if (mappedError) {
      res
        .status(mappedError.statusCode)
        .json({ error: mappedError.message, code: mappedError.statusCode });
      return;
    }
  }

  // Check if the error is one of the old exported error objects
  if (error.statusCode && error.message) {
    res
      .status(error.statusCode)
      .json({ error: error.message, code: error.statusCode });
    return;
  }

  // Default case
  const AppError = ERRORS.AppError;
  res
    .status(AppError.statusCode)
    .json({ error: AppError.message, code: AppError.statusCode });
}
