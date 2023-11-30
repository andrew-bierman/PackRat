import type { User as TUser } from '@prisma/client/edge';
import jwt from 'jsonwebtoken';

type ExtendedUser = {
  save: (prisma: any) => Promise<ExtendedUser>;
  toJSON: () => Partial<TUser>;
  generateAuthToken: (prisma: any, jwtSecret: string) => Promise<string>;
  generateResetToken: (
    prisma: any,
    jwtSecret: string,
    clinetUrl: string,
  ) => Promise<string>;
};

const User = <T>(prismaUser: T): T & ExtendedUser => {
  if (!prismaUser) return;
  return Object.assign(prismaUser, {
    async save(prisma: any): Promise<ExtendedUser> {
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

      const documentKeys = Object.keys(userObject).filter(
        (key) => key.includes('Document') || key.includes('Documents'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '').replace('Documents', '');
        userObject[newKey] = userObject[key];
        delete userObject[key];
      }

      return userObject;
    },
    async generateAuthToken(prisma: any, jwtSecret: string): Promise<string> {
      if (!jwtSecret) throw new Error('jwtSecret is not defined');
      const token = await jwt.sign({ id: this.id.toString() }, jwtSecret, {
        expiresIn: '7 days',
      });
      this.token = token;
      await prisma.user.update({
        where: { id: this.id },
        data: { token },
      });
      return token;
    },
    async generateResetToken(
      prisma: any,
      jwtSecret: string,
      clinetUrl: string,
    ): Promise<string> {
      if (this.passwordResetToken) {
        if (!jwtSecret) throw new Error('jwtSecret is not defined');
        const decoded: any = jwt.verify(this.passwordResetToken, jwtSecret);
        if (decoded.id) return this.passwordResetToken;
      }

      if (!jwtSecret) throw new Error('jwtSecret is not defined');
      const resetToken = await jwt.sign({ id: this.id.toString() }, jwtSecret, {
        expiresIn: '12h',
      });
      this.passwordResetToken = resetToken;
      await prisma.user.update({
        where: { id: this.id },
        data: { passwordResetToken: resetToken },
      });
      return `${clinetUrl}/password-reset?token=${resetToken}`;
    },
  });
};

export { User };
