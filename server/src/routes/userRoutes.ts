import { type Context, Hono, type Next } from 'hono';
import {
  getUsersRoute as getUsers,
  getUserById,
  // addUserRoute as ,
  editUserRoute as editUser,
  deleteUserRoute as deleteUser,
  // addToFavoriteRoute as addToFavorite,
  userSignIn,
  userSignup,
  sentEmail,
  resetPassword,
  getGoogleAuthURLRoute as getGoogleAuthURL,
  // googleSignin,
  getMeRoute as getMe,
} from '../controllers/user/index';
import * as validator from '@packrat/validations';

import { googleSigninRoute as signInGoogle } from '../controllers/passport/index';
import {
  emailExistsRoute as emailExists,
  updatePasswordRoute as updatePassword,
  checkCodeRoute as checkCode,
} from '../controllers/auth/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authMiddlewareHTTP from '../middleware/authHTTPS';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';
import { type Env } from '../db/client';

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
  authMiddlewareHTTP as any,
  checkRole(['admin']) as any,
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
  authMiddlewareHTTP as any,
  ((c: Context, next: Next) => {
    zodParser(validator.getUserById, c.req.param(), next);
    next();
  }) as any,
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
  (async (c: Context, next: Next) => {
    zodParser(validator.userSignIn, await c.req.json(), next);
  }) as any,
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
  (async (c: Context, next: Next) =>
    zodParser(validator.userSignUp, await c.req.json(), next)) as any,
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
  (async (c: Context, next: Next) =>
    zodParser(validator.sentEmail, await c.req.json(), next)) as any,
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
  (async (c: Context, next: Next) =>
    zodParser(validator.checkCode, await c.req.json(), next)) as any,
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
  authMiddlewareHTTP as any,
  checkRole(['user', 'admin']) as any,
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

// router.get(`/${REDIRECT_URL}`, tryCatchWrapper(googleSignin));

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
  authMiddlewareHTTP as any,
  (async (c: Context, next: Next) =>
    zodParser(validator.editUser, await c.req.json(), next)) as any,
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
  authMiddlewareHTTP as any,
  (async (c: Context, next: Next) =>
    zodParser(validator.deleteUser, await c.req.json(), next)) as any,
  tryCatchWrapper(deleteUser),
);

router.post(
  '/checkcode',
  authMiddlewareHTTP as any,
  (async (c: Context, next) =>
    zodParser(validator.checkCode, await c.req.json(), next)) as any,
  tryCatchWrapper(checkCode),
);
router.post(
  '/updatepassword',
  authMiddlewareHTTP as any,
  (async (c: Context, next: Next) =>
    zodParser(validator.updatePassword, await c.req.json(), next)) as any,
  tryCatchWrapper(updatePassword),
);
router.post(
  '/emailexists',
  (async (c: Context, next: Next) =>
    zodParser(validator.emailExists, await c.req.json(), next)) as any,
  tryCatchWrapper(emailExists),
);

export default router;
