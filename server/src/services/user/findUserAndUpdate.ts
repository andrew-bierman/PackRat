import { eq } from 'drizzle-orm';
import { User } from '../../drizzle/methods/User';
import { user as UserTable } from '../../db/schema';
/**
 * A function that finds a user by their email and updates their data.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} email - The email of the user to be found and updated.
 * @param {string} data - The new data to be assigned to the user.
 * @param {string} datatype - The data type of the user's data.
 * @return {Promise<any>} - A promise that resolves to the updated user object if successful,
 * or a string indicating the reason for failure.
 */
export async function findUserAndUpdate(
  email: string,
  data: string,
  datatype: string,
): Promise<any> {
  try {
    const dataToUpdate = {
      [datatype]: data,
    };
    const user = new User();
    const userDoc = await user.update(
      dataToUpdate,
      null,
      eq(UserTable.email, email.toLowerCase()),
    );

    if (userDoc) {
      return userDoc;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
