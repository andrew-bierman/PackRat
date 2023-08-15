// integrate passport js for email/passport sign in and google sign in

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail, resetEmail } from "../../utils/accountEmail.ts";

import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URL,
    SERVER_ROOT_URI,
} from "../../config.ts";

import { OAuth2Client } from "google-auth-library";
import utilsService from "../../utils/utils.service.ts";

const client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`
);

// Passport Configuration
// Local Strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "Incorrect email." });
                }

                const validPassword = await bcrypt.compare(password, user.password);

                if (!validPassword) {
                    return done(null, false, { message: "Incorrect passwordsss." });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

/**
 * Sign in with Google.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.idToken - The Google ID token.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
export const signInGoogle = async (req, res) => {
    try {
        const { idToken } = req.body;

        const decodedToken: any = jwt.decode(idToken);
        if (!decodedToken) {
            throw new Error("Invalid ID token");
        }

        const { email, name, sub: googleId } = decodedToken;

        const alreadyGoogleSignin = await User.findOne({ email, googleId });
        if (!alreadyGoogleSignin) {
            const isLocalLogin = await User.findOne({ email });

            if (isLocalLogin) {
                throw new Error("Already user registered on that email address");
            }

            const randomPassword = utilsService.randomPasswordGenerator(8);
            // const randomPassword = '1234abcdefg5678';

            const user = new User({
                email,
                name,
                password: randomPassword,
                googleId,
            });

            await user.save(); // save the user without callback

            await user.generateAuthToken();

            sendWelcomeEmail(user.email, user.name);

            res.status(200).send({ user });
        } else {
            if (!alreadyGoogleSignin.password) {
                alreadyGoogleSignin.password = utilsService.randomPasswordGenerator(8);
            }

            alreadyGoogleSignin.googleId = googleId;

            await alreadyGoogleSignin.generateAuthToken();

            await alreadyGoogleSignin.save();

            res.status(200).send({ user: alreadyGoogleSignin });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
