import express from "express";
import {
  getPublicTrips,
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
} from "../controllers/tripController.js";
import * as validator from "../middleware/validators/index.js";
import {auth} from '../middleware/auth.js'
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
 *       - Trips
 *     summary: Get public trips
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", getPublicTrips);

/**
 * @swagger
 * /trip/{ownerId}:
 *   get:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
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
router.get("/:ownerId", validator.getTrips, auth,getTrips);

/**
 * @swagger
 * /trip/t/{tripId}:
 *   get:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
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
router.get("/t/:tripId", validator.getTripById, auth,getTripById);

/**
 * @swagger
 * /trip:
 *   post:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
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
router.post("/", validator.addTrip, auth, addTrip);

/**
 * @swagger
 * /trip:
 *   put:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
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
router.put("/", validator.editTrip,auth, editTrip);

/**
 * @swagger
 * /trip:
 *   delete:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
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
router.delete("/", validator.deleteTrip, auth,deleteTrip);

export default router;
