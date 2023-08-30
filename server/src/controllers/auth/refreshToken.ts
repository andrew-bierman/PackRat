// @ts-nocheck
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import User from '../../models/userModel';
import { InvalidCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Checks the provided code against the user's email in the database.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - a promise that resolves to void
 */
export const refreshToken = async (req: any, res: any, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ message: 'No refresh token provided' });

  let decoded: any;
  try {
    decoded = jwt.verify(refreshToken, JWT_SECRET);
  } catch (e) {
    return InvalidCodeError;
  }

  if (decoded.type !== 'refresh') {
    return InvalidCodeError;
  }

  const user = await User.findById(decoded._id);
  if (!user || user.refreshToken !== refreshToken) {
    return InvalidCodeError;
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await user.generateAuthToken();
  return responseHandler(res, { accessToken, refreshToken: newRefreshToken });
};
