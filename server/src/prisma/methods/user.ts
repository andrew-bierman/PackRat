import type { User as TUser } from '@prisma/client/edge';
import { CLIENT_URL, JWT_SECRET } from '../../config';
import jwt from 'jsonwebtoken';
import prisma from '../client';

type ExtendedUser = {
  save: () => Promise<ExtendedUser>;
  toJSON: () => Partial<TUser>;
  generateAuthToken: () => Promise<string>;
  generateResetToken: () => Promise<string>;
};

const User = <T>(prismaUser: T): T & ExtendedUser => {
  if (!prismaUser) return;
  return Object.assign(prismaUser, {
    async save(): Promise<ExtendedUser> {
      const user = this;

      // Return the original user if it already has a username.
      if (user.username) return User(user);

      let generatedUsername = user.email
        ? user.email.split('@')[0]
        : 'packratuser';

      let counter = 1;
      let exists = await prisma.user.findFirst({
        where: { username: generatedUsername },
      });

      while (!!exists) {
        generatedUsername = `${user.email.split('@')[0]}${counter}`;
        counter++;
        exists = await prisma.user.findFirst({
          where: { username: generatedUsername },
        });
      }
      const {
        save,
        toJSON,
        generateAuthToken,
        generateResetToken,
        ...userObject
      } = user;
      const updatedUser = await prisma.user.upsert({
        where: {
          username: generatedUsername,
        },
        update: {
          username: generatedUsername,
        },
        create: { ...userObject, username: generatedUsername },
      });

      return User(updatedUser);
    },
    toJSON(): Partial<TUser> {
      const {
        password,
        passwordResetToken,
        // Remove function properties
        generateAuthToken,
        generateResetToken,
        save,
        toJSON,
        ...userObject
      } = this;
      return userObject;
    },
    async generateAuthToken(): Promise<string> {
      if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
      const token = await jwt.sign({ id: this.id.toString() }, JWT_SECRET, {
        expiresIn: '7 days',
      });
      this.token = token;
      await prisma.user.update({
        where: { id: this.id },
        data: { token },
      });
      return token;
    },
    async generateResetToken(): Promise<string> {
      if (this.passwordResetToken) {
        if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
        const decoded: any = jwt.verify(this.passwordResetToken, JWT_SECRET);
        if (decoded.id) return this.passwordResetToken;
      }

      if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
      const resetToken = await jwt.sign(
        { id: this.id.toString() },
        JWT_SECRET,
        {
          expiresIn: '12h',
        },
      );
      this.passwordResetToken = resetToken;
      await prisma.user.update({
        where: { id: this.id },
        data: { passwordResetToken: resetToken },
      });
      return `${CLIENT_URL}/password-reset?token=${resetToken}`;
    },
  });
};

export { User };
