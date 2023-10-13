import express from 'express';
import {
  getPublicTrips,
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
} from '../controllers/trip/index';
import * as validator from '../middleware/validators/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

import { Hono } from 'hono';

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
  (c, next) => zodParser(validator.getTrips, c.req.param(), next),
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
  (c, next) => zodParser(validator.getTripById, c.req.param(), next),
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
  (c, next) => zodParser(validator.addTrip, c.req.json(), next),
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
  (c, next) => zodParser(validator.editTrip, c.req.json(), next),
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
  (c, next) => zodParser(validator.deleteTrip, c.req.json(), next),
  tryCatchWrapper(deleteTrip),
);

export default router;
