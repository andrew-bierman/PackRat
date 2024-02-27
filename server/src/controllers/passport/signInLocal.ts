// integrate passport js for email/passport sign in and google sign in

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';

import bcrypt from 'bcryptjs';

// import { prisma } from '../../prisma';

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

/**
 * Sign in the user using local authentication.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise} A promise that resolves to the response object.
 */
// export const signInLocal = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     // Authenticate the user
//     passport.authenticate('local', (err, user, info) => {
//       if (err) {
//         return next(err);
//       }

//       if (!user) {
//         return res.status(400).json({ error: info.message });
//       }

//       // Log the user in
//       req.logIn(user, (err) => {
//         if (err) {
//           return next(err);
//         }

//         return res
//           .status(200)
//           .json({ message: 'User signed in successfully', user });
//       });
//     })(req, res, next);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   // Assuming "done" is a callback function
//   done(null, user);
// });
