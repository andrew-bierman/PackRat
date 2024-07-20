import { Hono } from 'hono';
import * as validator from '@packrat/validations';
import {
  addToFavorite,
  getFavoritePacksByUser,
  getUserFavorites,
} from '../controllers/favorite/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();
router.post(
  '/',
  authTokenMiddleware,
  zodParser(validator.addToFavorite, 'body'),
  tryCatchWrapper(addToFavorite),
);

router.get(
  '/user/:userId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getUserFavorites),
);

router.get(
  '/user/:userId/packs',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getFavoritePacksByUser),
);

export default router;
