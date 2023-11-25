import type { User } from '@prisma/client/edge';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function findByCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> {
  const user = await this.findFirst({ where: { email } });

  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login');

  return user;
}

// should be alreadyRegistered?
async function alreadyLogin(email: string) {
  const user = this.findFirst({
    where: { email },
  });

  if (user) throw new Error('Already email registered');
}

async function validateResetToken(
  token: string,
  jwtSecret: string,
): Promise<User> {
  if (!jwtSecret) throw new Error('jwtSecret is not defined');

  const decoded: any = jwt.verify(token, jwtSecret);
  const user = await this.findFirst({
    where: { id: decoded.id, passwordResetToken: token },
  });

  if (!user) throw new Error('User not Found');

  return user;
}

export default {
  alreadyLogin,
  findByCredentials,
  validateResetToken,
};
