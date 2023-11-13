import { prisma } from '../../prisma';

/**
 * Finds a user by their email address.
 *
 * @param {string} email - The email address of the user to find.
 * @return {Promise<any>} The result of the user search. If a user is found, it returns true. If no user is found, it returns "User not found". If an error occurs during the search, it returns "Server Error".
 */
export async function findUserByEmail(email: string): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user) {
      return true;
    } else {
      return 'User not found';
    }
  } catch (error) {
    return 'Server Error';
  }
}
