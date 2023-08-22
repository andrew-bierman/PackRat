import { UnableTouUpdatePasswordError } from "../../helpers/errors";
import User from "../../models/userModel";
import { findUserAndUpdate } from "../../services/user/user.service";

/**
 * Updates the password for a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
export const updatePassword = async (req, res,next) => {
    const { email, password } = req.body;
    let val = await findUserAndUpdate(email, password, "password");
    if (val) {
        res.status(200).json({ message: "success" });
    } else {
        next(UnableTouUpdatePasswordError)
    }
}