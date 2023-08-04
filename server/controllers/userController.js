import User from "../models/userModel.js";
import { register } from "../utils/registerUser.js";
import { loginUser } from "../utils/loginUser.js";
import Pack from "../models/packModel.js";
import { ObjectId } from "mongoose";
import bycrypt from "bcrypt";
// import firebase from "../index.js";
// import firebaseAdmin from "firebase-admin";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { sendWelcomeEmail, resetEmail } from "../utils/accountEmail.js";
import { google } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  REDIRECT_URL,
  UI_ROOT_URI,
  JWT_SECRET,
} from "../config.js";
import utilsService from "../utils/utils.service.js";

// Create a Google OAuth2 client with the provided credentials
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`
);

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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("packs trips");

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: "Users cannot be found" });
  }
};

// Get a user by their ID, along with their associated packs, favorites, and trips
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById({ _id: userId })
      .populate({
        path: "packs",
        populate: {
          path: "items",
          model: "Item", // Replace 'Item' with your actual Item model name
        },
      })
      .populate("favorites")
      .populate("trips");

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "User cannot be found" });
  }
};

// export const addUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Create user in Firebase Auth
//     const userRecord = await firebase.auth().createUser({
//       email: email,
//       password: password,
//     });
//     const uid = userRecord.uid;

//     // Create user in MongoDB and link to Firebase Auth UID
//     const newUser = new User({
//       email: email,
//       firebaseUid: uid, // <-- Store Firebase UID in MongoDB
//       // ... other user fields
//     });
//     await newUser.save();

//     res.status(200).json({ message: 'Successfully signed up' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const addToFavorite = async (req, res) => {
  try {
    const { packId, userId } = req.body;

    // Check if the pack already exists in user's favorites
    const exists = await User.find(
      { favorites: { $in: [packId] } },
      { _id: userId }
    );

    if (exists.length > 0) {
      // If the pack already exists in favorites, remove it
      await User.updateOne({ _id: userId }, { $pull: { favorites: packId } });
      await Pack.updateOne(
        { _id: packId },
        { $pull: { favorited_by: userId } }
      );
      await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: -1 } });
    } else {
      // If the pack does not exist in favorites, add it
      await User.updateOne({ _id: userId }, { $push: { favorites: packId } });
      await Pack.updateOne(
        { _id: packId },
        { $push: { favorited_by: userId } }
      );
      await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: 1 } });
    }

    // Get the updated user data and send it in the response
    const user = await User.findOne({ _id: userId }).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Function to edit user data
export const editUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by their _id and update their data with the provided request body
    const editedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      returnOriginal: false,
    }).populate("favorites");
    res.status(200).json(editedUser);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit user" });
  }
};

// Function to delete a user by their ID
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by their ID and delete them
    await User.findOneAndDelete({ _id: userId });

    res.status(200).json({ msg: "User was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete user" });
  }
};

// Function for user sign-in using email and password
export const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email and password
    const user = await User.findByCredentials({
      email: email,
      password: password,
    });

    // Generate an authentication token for the user
    await user.generateAuthToken();

    // Send the user data in the response
    res.status(200).send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Function for user signup using email and password
export const userSignup = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists with the given email
    await User.alreadyLogin(email);

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));
    req.body.password = await bcrypt.hash(req.body.password, salt);

    // Create a new user with the provided data
    const user = new User(req.body);
    await user.save();

    // Generate an authentication token for the user
    await user.generateAuthToken();

    // Send a welcome email to the user
    sendWelcomeEmail(user.email, user.name);

    // Send the user data in the response
    res.status(201).send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Function to send a password reset email to the user
export const sentEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate a reset URL and send the reset email to the user
    const resetUrl = await user.generateResetToken();
    resetEmail(user.email, resetUrl);

    res.status(200).send({
      message: "Reset Token has been sent successfully",
      status: "success",
      statusCode: 200,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Function to reset user's password using the reset token
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    // Validate the reset token and find the user
    const user = await User.validateResetToken(resetToken);

    // Update the user's password and save the changes
    user.password = password;
    await user.save();

    res.status(200).send({
      message: "Successfully reset password",
      status: "success",
      statusCode: 200,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Function to get the Google authentication URL for signing in with Google
export const getGoogleAuthURL = async (req, res) => {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    return res.status(200).send({
      googleUrl: oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
      }),
      status: "success",
      statusCode: 200,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Function to get Google user information after signing in with Google
const getGoogleUserInfo = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const { data: googleUser } = await google.oauth2("v2").userinfo.get({
    auth: oauth2Client,
  });
  return googleUser;
};

// Function for signing in using Google authentication
export const googleSignin = async (req, res) => {
  try {
    const code = req.query.code;
    const userInfo = await getGoogleUserInfo(code);

    // Check if the user already signed in with Google using their email and Google ID
    const alreadyGoogleSignin = await User.findOne({
      email: userInfo.email,
      googleId: userInfo.id,
    });

    if (!alreadyGoogleSignin) {
      // If the user does not have an existing Google sign-in, check if they have a local login using the email
      const isLocalLogin = await User.findOne({ email: userInfo.email });
      if (isLocalLogin) {
        throw new Error("Already a user registered on that email address");
      }

      // Create a new user with Google sign-in
      const user = new User({
        email: userInfo.email,
        name: userInfo.name,
        password: utilsService.randomPasswordGenerator(8),
        googleId: userInfo.id,
      });

      await user.save();
      await user.generateAuthToken();
      sendWelcomeEmail(user.email, user.name);
      res.redirect(`${UI_ROOT_URI}?token=${user.token}`);
    } else {
      // If the user already has an existing Google sign-in, update their Google ID and generate a new authentication token
      alreadyGoogleSignin.googleId = userInfo.id;
      await alreadyGoogleSignin.generateAuthToken();
      res.redirect(`${UI_ROOT_URI}?token=${alreadyGoogleSignin.token}`);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Function to get the authenticated user's data
export const getMe = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

// More functions and middleware can be added as needed for the user authentication and management process.
