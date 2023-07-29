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

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById({ _id: userId })
    .populate({
      path: 'packs',
      populate: {
        path: 'items',
        model: 'Item' // replace 'Item' with your actual Item model name
      }
    })
    .populate('favorites')
    .populate('trips');

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

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await User.findOneAndDelete({ _id: userId });

    res.status(200).json({ msg: "user was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit user" });
  }
};

export const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('user',req.body)
    const user = await User.findByCredentials({
      email: email,
      password:password,
    });
    await user.generateAuthToken();
    res.status(200).send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const userSignup = async (req, res) => {
  try {
    const { email } = req.body;
    await User.alreadyLogin(email);
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

export const sentEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
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
    const { resetToken, password } = req.body;

    const user = await User.validateResetToken(resetToken);
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
  oauth2Client.setCredentials(tokens);
  const { data: googleUser } = await google.oauth2("v2").userinfo.get({
    auth: oauth2Client,
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
