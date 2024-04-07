import { prisma } from '../prisma';
/**
 * Registers a user with the provided email, password, name, and source.
 *
 * @param {Object} params - The parameters for user registration.
 * @param {string} params.email - The email of the user to be registered.
 * @param {string} params.password - The password of the user to be registered.
 * @param {string} params.name - The name of the user to be registered.
 * @param {string} params.from - The source of the registration (UserSignIn or GoogleSignIn).
 * @throws {Error} Throws an error if any required fields are missing or if there is an issue with the source.
 * @throws {Error} Throws an error if the provided email is already in use.
 * @returns {Promise<Object>} Returns a Promise that resolves to the registered user.
 */
export const register = async ({
  email,
  password,
  name,
  from,
}: {
  email: string;
  password: string;
  name: string;
  from: string;
}) => {
  if (from === 'UserSignIn') {
    if (!email || !password || !name) {
      throw new Error('All fields must be filled');
    }
  }

  if (from === 'GoogleSignIn') {
    if (!email || !name) {
      throw new Error('All fields must be filled');
    }
  }

  if (!(from === 'GoogleSignIn' || from === 'UserSignIn')) {
    throw new Error('Something went wrong');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = await prisma.user.create({
    data: {
      name,
      password,
      email,
      is_certified_guide: false,
    },
  });

  return user;
};
