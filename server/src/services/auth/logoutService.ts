import { User as UserRepository } from 'src/drizzle/methods/User';

export const logoutService = async (refreshToken: string) => {
  const userRepository = new UserRepository();

  await userRepository.deleteRefreshToken(refreshToken);
};
