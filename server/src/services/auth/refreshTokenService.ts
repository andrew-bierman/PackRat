import * as jwt from 'hono/jwt';
import { User as UserRepository } from '../../drizzle/methods/User';

export const refreshTokenService = async (
  jwtSecret: string,
  refreshTokenSecret: string,
  token: string,
) => {
  const { id: userId } = await jwt.verify(token, refreshTokenSecret); // also checks expiry

  const userRepository = new UserRepository();

  const accessToken = await userRepository.generateAccessToken(
    jwtSecret,
    userId as string,
  );
  const refreshToken = await userRepository.generateRefreshToken(
    refreshTokenSecret,
    userId as string,
  );
  await userRepository.deleteRefreshToken(token); // revoke former refreshToken

  return { accessToken, refreshToken };
};
