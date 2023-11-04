import { prisma } from '../../prisma/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, CLIENT_URL } from '../../config';
export async function findByCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({ where: { email } } as any);

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
}

export async function alreadyLogin(email: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { email } } as any);

  if (user) {
    throw new Error('Email is already registered');
  }
}
export const generateResetToken = async function (user): Promise<string> {
  if (user.passwordResetToken) {
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    const decoded: any = jwt.verify(user.passwordResetToken, JWT_SECRET);
    if (decoded._id) return user.passwordResetToken;
  }
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  const resetToken = await jwt.sign({ _id: user.id.toString() }, JWT_SECRET, {
    expiresIn: '12h',
  });

  //update database
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken: resetToken,
    },
  });

  return `${CLIENT_URL}/password-reset?token=${resetToken}`;
};

export const generateAuthToken = async function (user): Promise<string> {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  const token = await jwt.sign({ _id: user.id.toString() }, JWT_SECRET, {
    expiresIn: '7 days',
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      token: token,
    },
  });
  return token;
};

export async function validateResetToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await prisma.user.findFirst({
    where: {
      id: decoded._id,
      passwordResetToken: token,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
