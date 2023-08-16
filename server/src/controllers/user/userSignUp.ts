import User from "../../models/userModel.ts";
import bycrypt from "bcrypt";
import bcrypt from "bcrypt";
import { sendWelcomeEmail, resetEmail } from "../../utils/accountEmail.ts";
import {
    JWT_SECRET,
} from "../../config.ts";

/**
 * Sign up a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The promise that resolves when the user is signed up.
 */
export const userSignup = async (req, res) => {
    try {
        const { email } = req.body;
        await (User as any).alreadyLogin(email);
        const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));
        req.body.password = await bycrypt.hash(req.body.password, salt);
        const user = new User(req.body);
        await user.save();
        await user.generateAuthToken();
        sendWelcomeEmail(user.email, user.name);
        res.status(201).send({ user });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};