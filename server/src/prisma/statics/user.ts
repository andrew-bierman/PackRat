import type { User } from '@prisma/client/edge';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../../config';
import jwt from 'jsonwebtoken';
import prisma from '../client';

async function findByCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login');

  return user;
}

// should be alreadyRegistered?
async function alreadyLogin(email: string) {
  const user = prisma.user.findFirst({
    where: { email },
  });

  if (user) throw new Error('Already email registered');
}

async function validateResetToken(token: string): Promise<User> {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

  const decoded: any = jwt.verify(token, JWT_SECRET);
  const user = await prisma.user.findFirst({
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
