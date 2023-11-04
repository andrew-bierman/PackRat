import { prisma } from "../../prisma/index";

/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByIdService = async (userId: string): Promise<object> => {
  try {
    console.log(  `the user id is ${userId}`)
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
     
    });
    if (user) {
      console.log(`the user exists ${JSON.stringify(user)}`)
      return user;
    } else {
      console.log(`there is no user`)
      throw new Error('User cannot be found');
    }
  } catch (error) {
    console.log("there was an error" + error.message +JSON.stringify(error))
    throw new Error('Server Error');
  }
};
