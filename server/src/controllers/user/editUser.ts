import User from "../../models/userModel.ts";

/**
 * Edits a user.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.userId - The ID of the user to edit.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the edited user.
 */
export const editUser = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const editedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
        returnOriginal: false,
      }).populate("favorites");
      res.status(200).json(editedUser);
    } catch (error) {
      res.status(404).json({ msg: "Unable to edit user" });
    }
  };