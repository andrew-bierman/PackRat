// integrate passport js for email/passport sign in and google sign in

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/userModel.ts";
import bcrypt from "bcrypt";

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
 * Sign up a user locally.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next function.
 * @return {Promise} A promise that resolves to nothing.
 */
export const signUpLocal = async (req, res, next) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email: email,
            password: hashedPassword,
            name: name,
        });

        await newUser.save();

        // Authenticate the user
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(400).json({ error: info.message });
            }

            // Log the user in
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res
                    .status(201)
                    .json({ message: "User created successfully", user: newUser });
            });
        })(req, res, next);
    } catch (error) {
        return res.status(400).json({ error: error.message });
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
