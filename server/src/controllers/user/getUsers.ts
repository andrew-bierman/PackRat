import User from '../../models/userModel'

// Middleware to check if user is authenticated
// export const isAuthenticated = async (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
//     req.userData = decodedToken;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

/**
 * Get all users from the database and send a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} The JSON response containing the users.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('packs trips')

    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ msg: 'Users cannot be found' })
  }
}
