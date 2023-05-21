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
import { checkCode, emailExists, updatePassword } from "../controllers/auth.js";

import {
  signInLocal,
  signUpLocal,
  signInGoogle,
} from "../controllers/passportController.js";
import { REDIRECT_URL } from "../config.js";

import { validate } from "../middleware/validation.js";
import userSchemas from "../utils/validationSchemas/userSchemas.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", validate(userSchemas.getUserById, "body"), getUserById);
// router.post("/", addUser);

router.post("/signin", validate(userSchemas.login, "body"), userSignin);
router.post("/signup", userSignup);
router.post("/reset-password-email", sentEmail);
router.post("/reset-password", resetPassword);
router.get("/me/info", auth, getMe);
router.get("/google/url", getGoogleAuthURL);
router.get(`/${REDIRECT_URL}`, googleSignin);

router.post("/google", signInGoogle);

router.post("/favorite", addToFavorite);
router.put("/", editUser);
router.delete("/", deleteUser);

router.post("/link-firebase-auth", linkFirebaseAuth);
router.post("/create-mongodb-user", createMongoDBUser);

router.post("/checkcode", checkCode);
router.post("/updatepassword", updatePassword);
router.post("/emailexists", emailExists);

export default router;
