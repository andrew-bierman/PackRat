// import { prisma } from '../prisma';
// /**
//  * Logs in a user based on the provided email, password, and source.
//  *
//  * @param {Object} params - The parameters for logging in.
//  * @param {string} params.email - The user's email.
//  * @param {string} params.password - The user's password.
//  * @param {string} params.from - The source of the login (UserSignIn or GoogleSignIn).
//  * @throws {Error} If the email or password is missing.
//  * @throws {Error} If the source is invalid.
//  * @throws {Error} If the email is incorrect.
//  * @return {Promise<any>} The logged in user.
//  */
// export const loginUser = async ({
//   email,
//   password,
//   from,
// }: {
//   email: string;
//   password: string;
//   from: string;
// }) => {
//   if (!email || !password) {
//     throw new Error('All fields must be filled');
//   }

//   if (!(from === 'UserSignIn' || from === 'GoogleSignIn')) {
//     throw new Error('Invalid source');
//   }

//   const user = await prisma.user.findFirst({
//     where: {
//       email: email.toLowerCase(),
//       password, // This assumes you have stored the password securely in the database
//     },
//     select: {
//       // Exclude the 'password' field
//       id: true,
//       email: true,
//       // Add other fields you need
//     },
//   });

//   if (!user) {
//     throw new Error('Incorrect email or password');
//   }

//   return user;
// };
