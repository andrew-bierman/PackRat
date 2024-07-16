import { Hono } from 'hono';
import {
  getUsers,
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
  getMe,
} from '../controllers/user/index';
import * as validator from '@packrat/validations';

import { googleSigninRoute as signInGoogle } from '../controllers/passport/index';
import {
  emailExistsRoute as emailExists,
  updatePasswordRoute as updatePassword,
  checkCodeRoute as checkCode,
} from '../controllers/auth/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware as any,
  checkRole(['admin']) as any,
  tryCatchWrapper(getUsers),
);

router.get(
  '/:userId',
  authTokenMiddleware as any,
  zodParser(validator.getUserById, 'params'),
  tryCatchWrapper(getUserById),
);

router.post(
  '/signin',
  zodParser(validator.userSignIn, 'body'),
  tryCatchWrapper(userSignIn),
);

router.post(
  '/signup',
  zodParser(validator.userSignUp, 'body'),
  tryCatchWrapper(userSignup),
);

router.post(
  '/reset-password-email',
  zodParser(validator.sentEmail, 'body'),
  tryCatchWrapper(sentEmail),
);

router.post(
  '/reset-password',
  zodParser(validator.checkCode, 'body'),
  tryCatchWrapper(resetPassword),
);

router.get(
  '/me/info',
  authTokenMiddleware as any,
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
  authTokenMiddleware as any,
  // ((req, res, next) => zodParser(validator.editUser, req.body, next)) as any,
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
  authTokenMiddleware as any,
  // ((req, res, next) => zodParser(validator.deleteUser, req.body, next)) as any,
  tryCatchWrapper(deleteUser),
);

router.post(
  '/checkcode',
  authTokenMiddleware as any,
  // ((req, res, next) => zodParser(validator.checkCode, req.body, next)) as any,
  tryCatchWrapper(checkCode),
);
router.post(
  '/updatepassword',
  authTokenMiddleware as any,
  // ((req, res, next) =>
  //   zodParser(validator.updatePassword, req.body, next)) as any,
  tryCatchWrapper(updatePassword),
);
router.post(
  '/emailexists',
  // ((req, res, next) => zodParser(validator.emailExists, req.body, next)) as any,
  tryCatchWrapper(emailExists),
);

export default router;
