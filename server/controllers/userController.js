import User from "../models/userModel.js";
import { register } from "../utils/registerUser.js";
import { loginUser } from "../utils/loginUser.js";
import Pack from "../models/packModel.js";
import { ObjectId } from "mongoose";
import firebase from "../index.js";
import firebaseAdmin from "firebase-admin";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import validator from "validator";
import { sendWelcomeEmail, resetEmail } from "../utils/accountEmail.js";
import { google } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  REDIRECT_URL,
  UI_ROOT_URI,
} from "../config.js";
import axios from "axios";
import utilsService from "../utils/utils.service.js";

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`
);

// Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const linkFirebaseAuth = async (req, res) => {
  const { firebaseAuthToken } = req.body;

  try {
    // Verify Firebase auth token and get the Firebase user ID
    const decodedToken = await firebaseAdmin
      .auth()
      .verifyIdToken(firebaseAuthToken, {
        audience: process.env.SERVICE_ACCOUNT_KEY_PROJECT_ID,
      });
    const firebaseUserId = decodedToken.uid;

    // Find the MongoDB user with the same email address as the Firebase user
    let user = await User.findOne({ email: decodedToken.email });

    // console.log("linkFirebaseAuth user:", user)
    if (!user) {
      const newUser = new User({
        email: decodedToken.email,
        firebaseUid: firebaseUserId,
        name: decodedToken.name,
        // any other relevant user information
      });
      user = await newUser.save();
      // return res.status(404).json({ error: 'User not found' });
    }

    // Update the MongoDB user document with the Firebase auth ID if it's not already set
    if (!user.firebaseUid) {
      user.firebaseUid = firebaseUserId;
      await user.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("packs trips");

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: "Users cannot be found" });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById({ _id: userId }).populate("packs");

    res.status(200).json(user);
  } catch (error) {
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

const getFirebaseUserByEmail = async (email) => {
  try {
    const firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);
    return firebaseUser;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return null;
    }
    throw error;
  }
};

export const createMongoDBUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if a user with the given email already exists in Firebase Auth
    const firebaseUser = await getFirebaseUserByEmail(email);

    // Check if the user already exists in MongoDB
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // <-- Hash the password
    const newUser = new User({
      email: email,
      firebaseUid: firebaseUser.uid,
      password: hashedPassword, // <-- Store hashed password in MongoDB
      name: name,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in MongoDB
    const user = await User.findOne({ email: email });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the stored hash of the password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Sign in the user in Firebase Auth to generate a Firebase auth token
    const firebaseUser = await firebaseAdmin
      .auth()
      .signInWithEmailAndPassword(email, password);
    const firebaseAuthToken = await firebaseUser.user.getIdToken();

    // Return the user details and Firebase auth token to the client
    res.status(200).json({
      message: "Successfully logged in",
      user: user,
      firebaseAuthToken: firebaseAuthToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addToFavorite = async (req, res) => {
  const { packId, userId } = req.body;

  try {
    const exists = await User.find(
      { favorites: { $in: [packId] } },
      { _id: userId }
    );

    if (exists.length > 0) {
      await User.updateOne({ _id: userId }, { $pull: { favorites: packId } });
      await Pack.updateOne(
        { _id: packId },
        { $pull: { favorited_by: userId } }
      );
      await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: -1 } });
    } else {
      await User.updateOne({ _id: userId }, { $push: { favorites: packId } });
      await Pack.updateOne(
        { _id: packId },
        { $push: { favorited_by: userId } }
      );
      await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: 1 } });
    }

    const user = await User.findOne({ _id: userId }).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const editedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      returnOriginal: false,
    }).populate("favorites");
    res.status(200).json(editedUser);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit user" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.body;
  try {
    await User.findOneAndDelete({ _id: userId });

    res.status(200).json({ msg: "user was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit user" });
  }
};

export const userSignin = async (req, res) => {
  try {
    const user = await User.findByCredentials({
      email: req.body.email,
      password: req.body.password,
    });
    await user.generateAuthToken();
    res.status(200).send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const userSignup = async (req, res) => {
  try {
    // If the Mongoose index is re-index or restart the, it will be removed. Refer to this link for more information: https://stackoverflow.com/questions/5535610/mongoose-unique-index-not-working
    await User.alreadyLogin(req.body.email);
    const user = new User(req.body);
    await user.save();
    await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.name);
    res.status(201).send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const sentEmail = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) throw new Error("Email is invalid");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }
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

export const resetPassword = async (req, res) => {
  try {
    const user = await User.validateResetToken(req.body.resetToken);
    user.password = req.body.password;
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

const getGoogleUserInfo = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return googleUser;
};

export const googleSignin = async (req, res) => {
  try {
    const code = req.query.code;
    const userInfo = await getGoogleUserInfo(code);

    const alreadyGoogleSignin = await User.findOne({
      email: userInfo.email,
      googleId: userInfo.id,
    });
    if (!alreadyGoogleSignin) {
      const isLocalLogin = await User.findOne({ email: userInfo.email });
      if (isLocalLogin) {
        throw new Error("Already user registered on that email address");
      }
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
      alreadyGoogleSignin.googleId = userInfo.id;
      await alreadyGoogleSignin.generateAuthToken();
      res.redirect(`${UI_ROOT_URI}?token=${alreadyGoogleSignin.token}`);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};
