// Import necessary modules and configurations
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
  SERVER_ROOT_URI,
} from "../config.js";

import { OAuth2Client } from "google-auth-library";
import utilsService from "../utils/utils.service.js";

// Create an OAuth2Client for Google sign-in
const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`
);

// Passport Configuration
// Local Strategy for email/password sign-in
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // Check if the password is valid
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user); // User is authenticated successfully
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Endpoint for local sign-up
export const signUpLocal = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    // Check if the email is already in use
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

    // Authenticate the user after sign-up
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

// Endpoint for local sign-in
export const signInLocal = async (req, res, next) => {
  const { email, password } = req.body;

  try {
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
          .status(200)
          .json({ message: "User signed in successfully", user: user });
      });
    })(req, res, next);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Endpoint for Google sign-in
export const signInGoogle = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Decode the Google ID token to get user information
    const decodedToken = jwt.decode(idToken);
    if (!decodedToken) {
      throw new Error("Invalid ID token");
    }

    const { email, name, sub: googleId } = decodedToken;

    // Check if the user has already signed in with Google before
    const alreadyGoogleSignin = await User.findOne({ email, googleId });
    if (!alreadyGoogleSignin) {
      // Check if the user is registered with the email used for Google sign-in
      const isLocalLogin = await User.findOne({ email });

      if (isLocalLogin) {
        throw new Error("User is already registered with this email address");
      }

      // Generate a random password for the new user
      const randomPassword = utilsService.randomPasswordGenerator(8);

      // Create a new user with Google sign-in details
      const user = new User({
        email,
        name,
        password: randomPassword,
        googleId,
      });

      await user.save();

      // Generate an authentication token for the new user
      await user.generateAuthToken();

      // Send a welcome email to the new user
      sendWelcomeEmail(user.email, user.name);

      res.status(200).send({ user });
    } else {
      if (!alreadyGoogleSignin.password) {
        alreadyGoogleSignin.password = utilsService.randomPasswordGenerator(8);
      }

      // Update the user's Google ID and generate a new authentication token
      alreadyGoogleSignin.googleId = googleId;

      await alreadyGoogleSignin.generateAuthToken();

      await alreadyGoogleSignin.save();

      res.status(200).send({ user: alreadyGoogleSignin });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
