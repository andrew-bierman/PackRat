import User from "../models/userModel.js";
import { register } from "../utils/registerUser.js";
import { loginUser } from "../utils/loginUser.js";
import Pack from "../models/packModel.js";
import { ObjectId } from "mongoose";
import firebase from "firebase-admin";
import { v4 as uuid } from "uuid";


// Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const linkFirebaseAuth = async (req, res) => {
  const { firebaseAuthToken } = req.body;

  try {
    // Verify Firebase auth token and get the Firebase user ID
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(firebaseAuthToken);
    const firebaseUserId = decodedToken.uid;

    // Find the MongoDB user with the same email address as the Firebase user
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the MongoDB user document with the Firebase auth ID if it's not already set
    if (!user.firebaseAuthId) {
      user.firebaseAuthId = firebaseUserId;
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

export const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create user in Firebase Auth
    const userRecord = await firebase.auth().createUser({
      email: email,
      password: password,
    });
    const uid = userRecord.uid;

    // Create user in MongoDB and link to Firebase Auth UID
    const newUser = new User({
      email: email,
      firebaseUid: uid, // <-- Store Firebase UID in MongoDB
      // ... other user fields
    });
    await newUser.save();

    res.status(200).json({ message: 'Successfully signed up' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createMongoDBUser = async (req, res) => {
  const { email, firebaseUid } = req.body;

  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create new user record in MongoDB
    const newUser = new User({
      email: email,
      firebaseUid: firebaseUid,
      // any other relevant user information
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRecord = await firebase.auth().signInWithEmailAndPassword(email, password);

    res.status(200).json({
      message: "Successfully logged in",
      user: userRecord,
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
