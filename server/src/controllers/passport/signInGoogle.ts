// integrate passport js for email/passport sign in and google sign in

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';

import bcrypt from 'bcryptjs';
import * as jwt from 'hono/jwt';
import { sendWelcomeEmail, resetEmail } from '../../utils/accountEmail';
// import { prisma } from '../../prisma';
// import { User } from '../../prisma/methods';

// import {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   REDIRECT_URL,
//   SERVER_ROOT_URI,
// } from '../../config';

// import { OAuth2Client } from 'google-auth-library';
import utilsService from '../../utils/utils.service';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import z from 'zod';
import { User } from '../../drizzle/methods/User';
import { and, eq } from 'drizzle-orm';
import { user as UserTable } from '../../db/schema';
// const client = new OAuth2Client(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`,
// );

// Passport Configuration
// Local Strategy
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user = await prisma.user.findUnique({
//           where: {
//             email: email,
//           },
//         });
//         if (!user) {
//           return done(null, false, { message: 'Incorrect email.' });
//         }

//         const validPassword = await bcrypt.compare(password, user.password);

//         if (!validPassword) {
//           return done(null, false, { message: 'Incorrect passwordsss.' });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     },
//   ),
// );

// /**
//  * Sign in with Google.
//  * @param {Object} req - The request object.
//  * @param {Object} req.body - The request body.
//  * @param {string} req.body.idToken - The Google ID token.
//  * @param {Object} res - The response object.
//  * @return {Promise<void>} The function does not return anything.
//  */
// export const signInGoogle = async (req, res) => {
//   try {
//     const { idToken } = req.body;

//     const decodedToken: any = jwt.decode(idToken);

//     if (!decodedToken) {
//       throw new Error('Invalid ID token');
//     }

//     const { email, name, sub: googleId } = decodedToken;

//     const alreadyGoogleSignin = await prisma.user.findUnique({
//       where: {
//         email: email,
//         googleId: googleId,
//       },
//     });
//     if (!alreadyGoogleSignin) {
//       const isLocalLogin = await prisma.user.findUnique({
//         where: {
//           email: email,
//         },
//       });

//       if (isLocalLogin) {
//         throw new Error('Already user registered on that email address');
//       }

//       const randomPassword = utilsService.randomPasswordGenerator(8);
//       const username = utilsService.randomUserNameCode(email, 4);
//       const user = await prisma.user.create({
//         data: {
//           email,
//           name,
//           password: randomPassword,
//           googleId,
//           username,
//         },
//       });

//       const userWithMethods = User(user);
//       await userWithMethods.generateAuthToken();

//       sendWelcomeEmail(user.email, user.name);

//       res.locals.data = { user };
//       responseHandler(res);
//     } else {
//       if (!alreadyGoogleSignin.password) {
//         alreadyGoogleSignin.password = utilsService.randomPasswordGenerator(8);
//       }

//       alreadyGoogleSignin.googleId = googleId;
//       await prisma.user.update({
//         where: {
//           email: alreadyGoogleSignin.email,
//         },
//         data: {
//           googleId: googleId,
//         },
//       });

//       const userWithMethods = User(alreadyGoogleSignin);
//       await userWithMethods.generateAuthToken();

//       res.locals.data = { user: alreadyGoogleSignin };
//       responseHandler(res);
//     }
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// };

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   prisma.user
//     .findUnique({
//       where: {
//         id: id,
//       },
//     })
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => {
//       done(err, null);
//     });
// });

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
