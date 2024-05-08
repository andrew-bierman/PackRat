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

/**
 * @swagger
 * /favorite:
 *   post:
 *     summary: Add to favorite
 *     tags: [Favorite]
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
router.post(
  '/',
  (req, res, next) => zodParser(validator.addToFavorite, req.body, next),
  tryCatchWrapper(addToFavorite),
);

/**
 * @swagger
 * /favorite/user/{userId}:
 *   get:
 *     summary: Get favorites of a user
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: Successful response with user's favorites
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving favorites
 */
router.get(
  '/user/:userId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getUserFavorites),
);

/**
 * @swagger
 * /favorite/user/{userId}/packs:
 *   get:
 *     summary: Get favorite packs of a user
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: Successful response with user's favorite packs
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving favorite packs
 */
router.get(
  '/user/:userId/packs',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getFavoritePacksByUser),
);

export default router;
