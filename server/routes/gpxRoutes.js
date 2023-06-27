import express from "express";
import { getGeoJSONtoGPX } from "../controllers/gpxController.js";
import * as validator from "../middleware/validators/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: GPX
 *   description: GPX routes
 */

/**
 * @swagger
 * /gpx/geojson:
 *   post:
 *     tags:
 *       - GPX
 *     summary: Convert geoJSON to GPX
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geoJSON:
 *                 type: object
 *             required:
 *               - geoJSON
 *     responses:
 *       "200":
 *         description: Successful response
 *       "400":
 *         description: Bad request
 *       "404":
 *         description: Not found
 */

router.post("/geojson", getGeoJSONtoGPX);

export default router;
