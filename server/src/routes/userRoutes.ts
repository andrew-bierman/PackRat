import { Hono } from 'hono';
import {
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  // addToFavoriteRoute as addToFavorite,
  userSignIn,
  userSignup,
  sentEmail,
  resetPassword,
  getGoogleAuthURL,
  getMe,
} from '../controllers/user/index';
import * as validator from '@packrat/validations';

import { signInGoogle } from '../controllers/passport/index';
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

router.get(
  '/',
  authTokenMiddleware,
  checkRole(['admin']),
  tryCatchWrapper(getUsers),
);

router.get(
  '/:userId',
  authTokenMiddleware,
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
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getMe),
);

router.get('/google/url', tryCatchWrapper(getGoogleAuthURL));

// router.get(`/${REDIRECT_URL}`, tryCatchWrapper(googleSignin));

router.post('/google', tryCatchWrapper(signInGoogle));

router.put(
  '/',
  authTokenMiddleware,
  zodParser(validator.editUser, 'body'),
  tryCatchWrapper(editUser),
);

router.delete(
  '/',
  authTokenMiddleware,
  zodParser(validator.deleteUser, 'body'),
  tryCatchWrapper(deleteUser),
);

router.post(
  '/checkcode',
  authTokenMiddleware,
  zodParser(validator.checkCode, 'body'),
  tryCatchWrapper(checkCode),
);
router.post(
  '/updatepassword',
  authTokenMiddleware,
  zodParser(validator.updatePassword, 'body'),
  tryCatchWrapper(updatePassword),
);
router.post(
  '/emailexists',
  zodParser(validator.emailExists, 'body'),
  tryCatchWrapper(emailExists),
);

export default router;
