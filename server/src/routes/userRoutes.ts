import { Hono } from 'hono';
import {
  getUsers,
  getUserById,
  // addUser,
  editUser,
  deleteUser,
  addToFavorite,
  userSignIn,
  userSignup,
  sentEmail,
  resetPassword,
  getGoogleAuthURL,
  googleSignin,
  getMe,
} from '../controllers/user/index';
import auth from '../middleware/auth';
import * as validator from '@packrat/validations';

import {
  signInLocal,
  signUpLocal,
  signInGoogle,
} from '../controllers/passport/index';
import { REDIRECT_URL } from '../config';
import {
  emailExists,
  updatePassword,
  checkCode,
} from '../controllers/auth/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

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
 *     responses:
 *       '200':
 *         description: Successful response with all users
 *       '500':
 *         description: Error retrieving users
 */
router.get(
  '/',
  authTokenMiddleware,
  checkRole(['admin']),
  tryCatchWrapper(getUsers),
);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
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
router.get(
  '/:userId',
  (req, res, next) => {
    zodParser(validator.getUserById, req.params, next);
    next();
  },
  tryCatchWrapper(getUserById),
);

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
router.post(
  '/signin',
  (req, res, next) => zodParser(validator.userSignIn, req.body, next),
  tryCatchWrapper(userSignIn),
);

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

router.post(
  '/signup',
  (req, res, next) => zodParser(validator.userSignUp, req.body, next),
  tryCatchWrapper(userSignup),
);

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
router.post(
  '/reset-password-email',
  (req, res, next) => zodParser(validator.sentEmail, req.body, next),
  tryCatchWrapper(sentEmail),
);

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
router.post(
  '/reset-password',
  (req, res, next) => zodParser(validator.checkCode, req.body, next),
  tryCatchWrapper(resetPassword),
);

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
router.get(
  '/me/info',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getMe),
);

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
router.get('/google/url', tryCatchWrapper(getGoogleAuthURL));

router.get(`/${REDIRECT_URL}`, tryCatchWrapper(googleSignin));

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
router.post('/google', tryCatchWrapper(signInGoogle));

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Edit user
 *     tags: [User]
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
router.put(
  '/',
  (req, res, next) => zodParser(validator.editUser, req.body, next),
  tryCatchWrapper(editUser),
);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
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
router.delete(
  '/',
  (req, res, next) => zodParser(validator.deleteUser, req.body, next),
  tryCatchWrapper(deleteUser),
);

router.post(
  '/checkcode',
  (req, res, next) => zodParser(validator.checkCode, req.body, next),
  tryCatchWrapper(checkCode),
);
router.post(
  '/updatepassword',
  (req, res, next) => zodParser(validator.updatePassword, req.body, next),
  tryCatchWrapper(updatePassword),
);
router.post(
  '/emailexists',
  (req, res, next) => zodParser(validator.emailExists, req.body, next),
  tryCatchWrapper(emailExists),
);

export default router;
