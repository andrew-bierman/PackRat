import express from "express";
import {
  getOsm,
  getParksOSM,
  getPhotonResults,
  getTrailsOSM,
} from "../controllers/getOsmController.js";
import {auth} from '../middleware/auth.js'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OSM
 *   description: OSM routes
 */

/**
 * @swagger
 * /osm/photon/search:
 *   get:
 *     summary: Get Photon search results
 *     tags: [OSM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchString
 *         schema:
 *           type: string
 *         required: true
 *         description: The search string for Photon API
 *     responses:
 *       '200':
 *         description: Successful response with Photon search results
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving Photon results
 */
router.get("/photon/search", auth,getPhotonResults);

/**
 * @swagger
 * /osm/trails:
 *   get:
 *     summary: Get Trails OSM results
 *     tags: [OSM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: lon
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful response with Trails OSM results
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Error retrieving Trails OSM results
 */
router.get("/trails",auth, getTrailsOSM);

/**
 * @swagger
 * /osm/parks:
 *   get:
 *     summary: Get Parks OSM results
 *     tags: [OSM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         required: false
 *     responses:
 *       '200':
 *         description: Successful response with Parks OSM results
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving Parks OSM results
 */
router.get("/parks", auth,getParksOSM);

/**
 * @swagger
 * /osm:
 *   post:
 *     summary: Get OSM data
 *     tags: [OSM]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: object
 *             properties:
 *               activityType:
 *                 type: string
 *               startPoint:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *               endPoint:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *     responses:
 *       '200':
 *         description: Successful response with OSM data
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving Overpass Data
 */
router.post("/osm", auth,getOsm);

export default router;
