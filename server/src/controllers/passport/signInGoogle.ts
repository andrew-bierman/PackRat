import * as jwt from 'hono/jwt';
import { sendWelcomeEmail } from '../../utils/accountEmail';

import utilsService from '../../utils/utils.service';
import { publicProcedure } from '../../trpc';
import z from 'zod';
import { User } from '../../drizzle/methods/User';
import { and, eq } from 'drizzle-orm';
import { user as UserTable } from '../../db/schema';
import { type Context } from 'hono';

export const signInGoogle = async (c: Context) => {
  try {
    const { idToken } = await c.req.json();

    const decodedToken: any = jwt.decode(idToken);
    if (!decodedToken) {
      throw new Error('Invalid ID token');
    }
    console.log('decodedToken', decodedToken);
    const {
      payload: { email, name, sub: googleId },
    } = decodedToken;

    const userClass = new User();
    const alreadyGoogleSignin = await userClass.findUnique({
      where: {
        email,
        googleId,
      },
    });

    if (!alreadyGoogleSignin) {
      const isLocalLogin = await userClass.findUnique({
        where: {
          email,
        },
      });

      if (isLocalLogin) {
        throw new Error('Already user registered on that email address');
      }

      const randomPassword = utilsService.randomPasswordGenerator(8);
      const username = utilsService.randomUserNameCode(email, 4);

      const user = await userClass.create({
        email,
        name,
        password: randomPassword,
        googleId,
        username,
      });

      await userClass.generateAuthToken(c.env.JWT_SECRET, user.id);

      sendWelcomeEmail(
        user.email,
        user.name,
        c.env.STMP_EMAIL,
        c.env.SEND_GRID_API_KEY,
      );
      return user;
    } else {
      if (!alreadyGoogleSignin.password) {
        alreadyGoogleSignin.password = utilsService.randomPasswordGenerator(8);
      }

      await userClass.generateAuthToken(
        c.env.JWT_SECRET,
        alreadyGoogleSignin.id,
      );

      if (!alreadyGoogleSignin.googleId) {
        throw new Error('Google ID is missing');
      }

      const updatedUser = await userClass.update(
        {
          googleId,
        },
        and(
          eq(UserTable.id, alreadyGoogleSignin.id),
          eq(UserTable.googleId, alreadyGoogleSignin.googleId),
          eq(UserTable.email, alreadyGoogleSignin.email),
        ),
      );
      return c.json(updatedUser?.[0], 200);
    }
  } catch (err) {
    return c.json({ message: err.message });
    // throw new Error(`Google Signin failed: ${err.message}`);
  }
};

export function googleSigninRoute() {
  return publicProcedure
    .input(z.object({ idToken: z.string().nonempty() }))
    .query(async (opts) => {
      try {
        const { idToken } = opts.input;
        const { env }: any = opts.ctx;

        const decodedToken: any = jwt.decode(idToken);
        if (!decodedToken) {
          throw new Error('Invalid ID token');
        }

        const {
          payload: { email, name, sub: googleId },
        } = decodedToken;

        const userClass = new User();
        const alreadyGoogleSignin = await userClass.findUnique({
          where: {
            email,
            googleId,
          },
        });

        if (!alreadyGoogleSignin) {
          const isLocalLogin = await userClass.findUnique({
            where: {
              email,
            },
          });

          if (isLocalLogin) {
            throw new Error('Already user registered on that email address');
          }

          const randomPassword = utilsService.randomPasswordGenerator(8);
          const username = utilsService.randomUserNameCode(email, 4);

          const user = await userClass.create({
            email,
            name,
            password: randomPassword,
            googleId,
            username,
          });

          await userClass.generateAuthToken(env.JWT_SECRET, user.id);

          sendWelcomeEmail(
            user.email,
            user.name,
            env.STMP_EMAIL,
            env.SEND_GRID_API_KEY,
          );
          return user;
        } else {
          if (!alreadyGoogleSignin.password) {
            alreadyGoogleSignin.password =
              utilsService.randomPasswordGenerator(8);
          }

          await userClass.generateAuthToken(
            env.JWT_SECRET,
            alreadyGoogleSignin.id,
          );

          if (!alreadyGoogleSignin.googleId) {
            throw new Error('Google ID is missing');
          }

          const updatedUser = await userClass.update(
            {
              googleId,
            },
            and(
              eq(UserTable.id, alreadyGoogleSignin.id),
              eq(UserTable.googleId, alreadyGoogleSignin.googleId),
              eq(UserTable.email, alreadyGoogleSignin.email),
            ),
          );
          return updatedUser?.[0];
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Google Signin failed: ${error.message}`);
      }
    });
}
