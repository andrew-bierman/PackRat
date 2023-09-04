import express from 'express';
import {
  getPublicTrips,
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
  scoreTrip
} from '../controllers/trip/index';
import * as validator from '../middleware/validators/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip routes
 */

/**
 * @swagger
 * /trip:
 *   get:
 *     tags:
 *      - Trips
 *     summary: Get public trips
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getPublicTrips),
);

/**
 * @swagger
 * /trip/{ownerId}:
 *   get:
 *     tags:
 *       - Trips
 *     summary: Get trips by owner ID
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
  '/:ownerId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  validator.getTrips,
  tryCatchWrapper(getTrips),
);

/**
 * @swagger
 * /trip/t/{tripId}:
 *   get:
 *     tags:
 *       - Trips
 *     summary: Get trip by trip ID
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
  '/t/:tripId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  validator.getTripById,
  tryCatchWrapper(getTripById),
);

/**
 * @swagger
 * /trip:
 *   post:
 *     tags:
 *       - Trips
 *     summary: Add a new trip
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: string
 *               weather:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               destination:
 *                 type: string
 *               trail:
 *                 type: string
 *               owner_id:
 *                 type: string
 *               packs:
 *                 type: array
 *                 items:
 *                   type: string
 *               is_public:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  validator.addTrip,
  tryCatchWrapper(addTrip),
);

/**
 * @swagger
 * /trip:
 *   put:
 *     tags:
 *       - Trips
 *     summary: Edit an existing trip
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: string
 *               weather:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               destination:
 *                 type: string
 *               trail:
 *                 type: string
 *               owner_id:
 *                 type: string
 *               packs:
 *                 type: array
 *                 items:
 *                   type: string
 *               is_public:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successful response
 */
router.put(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  validator.editTrip,
  tryCatchWrapper(editTrip),
);

/**
 * @swagger
 * /trip/score/{tripId}:
 *   put:
 *     summary: Score a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the trip
 *     responses:
 *       '200':
 *         description: Successful response after scoring the trip
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error scoring the trip
 */
router.put(
  '/score/:tripId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  validator.getTripById,
  tryCatchWrapper(scoreTrip),
);

/**
 * @swagger
 * /trip:
 *   delete:
 *     tags:
 *       - Trips
 *     summary: Delete a trip by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.delete(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  validator.deleteTrip,
  tryCatchWrapper(deleteTrip),
);

export default router;
