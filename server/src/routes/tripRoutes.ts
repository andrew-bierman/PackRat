import { Hono } from 'hono';
import {
  getPublicTripsRoute as getPublicTrips,
  getTripsRoute as getTrips,
  getTripByIdRoute as getTripById,
  addTripRoute as addTrip,
  editTripRoute as editTrip,
  deleteTripRoute as deleteTrip,
} from '../controllers/trip/index';
import * as validator from '@packrat/validations';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

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
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
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
  authTokenMiddleware as any,
  ((req, res, next) => zodParser(validator.getTrips, req.params, next)) as any,
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
  authTokenMiddleware as any,
  ((req, res, next) =>
    zodParser(validator.getTripById, req.params, next)) as any,
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
  authTokenMiddleware as any,
  ((req, res, next) => zodParser(validator.addTrip, req.body, next)) as any,
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
 *               id:
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
  authTokenMiddleware as any,
  ((req, res, next) => zodParser(validator.editTrip, req.body, next)) as any,
  tryCatchWrapper(editTrip),
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
  authTokenMiddleware as any,
  ((req, res, next) => zodParser(validator.deleteTrip, req.body, next)) as any,
  tryCatchWrapper(deleteTrip),
);

export default router;
