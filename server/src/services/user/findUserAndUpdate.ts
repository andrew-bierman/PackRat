import User from '../../models/userModel';

/**
 * A function that finds a user by their email and updates their data.
 *
 * @param {string} email - The email of the user to be found and updated.
 * @param {string} data - The new data to be assigned to the user.
 * @param {type} datatype - The data type of the user's data.
 * @return {Promise<any>} - A promise that resolves to the updated user object if successful,
 * or a string indicating the reason for failure.
 */
export async function findUserAndUpdate(
  email: string,
  data: string,
  datatype: any,
): Promise<any> {
  try {
    const val = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { [datatype]: data },
      {
        returnOriginal: false,
      },
    );
    if (val && val.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
