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
} from "../controllers/userController.js";

import { checkCode, emailExists, updatePassword } from "../controllers/auth.js";

import {
  signInLocal,
  signUpLocal,
  signInGoogle,
} from "../controllers/passportController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
// router.post("/", addUser);

router.post("/signin", userSignin);
router.post("/signup", userSignup);
router.post("/reset-password-email", sentEmail);
router.post("/reset-password", resetPassword);
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
