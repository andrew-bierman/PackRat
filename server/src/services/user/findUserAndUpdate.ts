import { User } from '../../drizzle/methods/User';
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
    const userClass = new User();
    const user = await userClass.findUser({ email });

    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await userClass.update({
      id: user.id,
      [datatype]: data,
    });
    return { status: true, user: updatedUser };
  } catch (error) {
    throw new Error(error.toString());
  }
}
