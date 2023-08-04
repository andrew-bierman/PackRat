import express from "express";
import { uploadGeoJSON }  from "../controllers/uploadGeoJsonController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: item routes
 */

/**
 * @swagger
 * /item/packItems/{packId}:
 *  get:
 *    tags:
 *      - Items
 *    summary: Get items by pack ID
 *    parameters:
 *      - in: path
 *        name: packId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.post("/",uploadGeoJSON);

export default router;
