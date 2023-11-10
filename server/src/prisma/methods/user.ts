import type { User as TUser } from '@prisma/client';
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

      const updatedUser = await prisma.user.upsert({
        where: {
          username: generatedUsername,
        },
        update: {
          username: generatedUsername,
        },
        create: { ...user, username: generatedUsername },
      });

      return User(updatedUser);
    },
    toJSON(): Partial<TUser> {
      const { password, passwordResetToken, ...userObject } = this;
      return userObject;
    },
    async generateAuthToken(): Promise<string> {
      if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
      const token = await jwt.sign({ _id: this.id.toString() }, JWT_SECRET, {
        expiresIn: '7 days',
      });
      this.token = token;
      console.log('UPDATTING', this.id, token);
      await prisma.user.update({
        where: { id: this.id },
        data: { token },
      });
      console.log('UPDATED');
      return token;
    },
    async generateResetToken(): Promise<string> {
      if (this.passwordResetToken) {
        if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
        const decoded: any = jwt.verify(this.passwordResetToken, JWT_SECRET);
        if (decoded._id) return this.passwordResetToken;
      }

      if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
      const resetToken = await jwt.sign(
        { _id: this.id.toString() },
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
