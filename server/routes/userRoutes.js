import express from "express";
import {
  getUsers,
  getUserById,
  // addUser,
  editUser,
  deleteUser,
  addToFavorite,
  userSignin,
  userSignup,
  sentEmail,
  resetPassword,
  getGoogleAuthURL,
  googleSignin,
  getMe,
} from "../controllers/userController.js";
import {auth} from "../middleware/auth.js";
import * as validator from "../middleware/validators/index.js";

import { checkCode, emailExists, updatePassword } from "../controllers/auth.js";

import {
  signInLocal,
  signUpLocal,
  signInGoogle,
} from "../controllers/passportController.js";
import { REDIRECT_URL } from "../config.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User routes
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with all users
 *       '500':
 *         description: Error retrieving users
 */
router.get("/", auth,getUsers);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: Successful response with the user
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving the user
 */
router.get("/:userId", validator.getUserById, auth, getUserById);

// router.post("/", addUser);

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: User sign-in
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful sign-in
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error signing in
 */
router.post("/signin", validator.userSignIn, userSignin);

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User sign-up
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful sign-up
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error signing up
 */
router.post("/signup", validator.userSignUp, userSignup);

/**
 * @swagger
 * /user/reset-password-email:
 *   post:
 *     summary: Send reset password email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful email sent
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error sending the email
 */
router.post("/reset-password-email", validator.sentEmail, sentEmail);

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful password reset
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error resetting the password
 */
router.post("/reset-password", validator.resetPassword, resetPassword);

/**
 * @swagger
 * /user/me/info:
 *   get:
 *     summary: Get user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with user information
 *       '401':
 *         description: Unauthorized - Invalid or missing authentication token
 *       '500':
 *         description: Error retrieving user information
 */
router.get("/me/info", auth, getMe);

/**
 * @swagger
 * /user/google/url:
 *   get:
 *     summary: Get Google authentication URL
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Successful response with Google authentication URL
 *       '500':
 *         description: Error retrieving Google authentication URL
 */
router.get("/google/url", getGoogleAuthURL);

router.get(`/${REDIRECT_URL}`, googleSignin);

/**
 * @swagger
 * /user/google:
 *   post:
 *     summary: Sign in with Google
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful sign-in with Google
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error signing in with Google
 */
router.post("/google", signInGoogle);

/**
 * @swagger
 * /user/favorite:
 *   post:
 *     summary: Add to favorite
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response adding to favorite
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error adding to favorite
 */
router.post("/favorite", validator.addToFavorite, auth,addToFavorite);

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Edit user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response editing the user
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error editing the user
 */
router.put("/", validator.editUser, auth,editUser);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response deleting the user
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error deleting the user
 */
router.delete("/", validator.deleteUser, auth,deleteUser);

router.post("/checkcode", validator.checkCode, checkCode);
router.post("/updatepassword", validator.updatePassword, updatePassword);
router.post("/emailexists", validator.emailExists, emailExists);

export default router;
