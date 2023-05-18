import express from "express";
import {
  getUsers,
  getUserById,
  // addUser,
  editUser,
  deleteUser,
  login,
  addToFavorite,
  linkFirebaseAuth,
  createMongoDBUser,
  userSignin,
  userSignup,
  sentEmail,
  resetPassword,
  getGoogleAuthURL,
  googleSignin,
  getMe,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import * as validator from "../middleware/validators/index.js"
import { checkCode, emailExists, updatePassword } from "../controllers/auth.js";

import {
  signInLocal,
  signUpLocal,
  signInGoogle,
} from "../controllers/passportController.js";
import { REDIRECT_URL } from "../config.js";

const router = express.Router();
router.get("/", getUsers);
router.get("/:userId", validator.getUserById, getUserById);
// router.post("/", addUser);

router.post("/signin", validator.userSignIn, userSignin);
router.post("/signup", validator.userSignUp, userSignup);
router.post("/reset-password-email", validator.sentEmail, sentEmail);
router.post("/reset-password", validator.resetPassword, resetPassword);
router.get("/me/info", auth, getMe);
router.get("/google/url", getGoogleAuthURL);
router.get(`/${REDIRECT_URL}`, googleSignin);

router.post("/google", signInGoogle);

router.post("/favorite", validator.addToFavorite, addToFavorite);
router.put("/", validator.editUser, editUser);
router.delete("/", validator.deleteUser, deleteUser);

router.post("/link-firebase-auth", validator.linkFirebaseAuth, linkFirebaseAuth);
router.post("/create-mongodb-user", validator.createMongoDBUser, createMongoDBUser);

router.post("/checkcode", validator.checkCode, checkCode);
router.post("/updatepassword", validator.updatePassword, updatePassword);
router.post("/emailexists", validator.emailExists, emailExists);

export default router;
