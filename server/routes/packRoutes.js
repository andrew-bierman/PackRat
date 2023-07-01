import express from "express";
import {
  getPacks,
  getPackById,
  addPack,
  editPack,
  deletePack,
  getPublicPacks,
  scorePack,
} from "../controllers/packController.js";
import * as validator from "../middleware/validators/index.js";
import {auth} from '../middleware/auth.js'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Packs
 *   description: Pack routes
 */

/**
 * @swagger
 * /pack:
 *   get:
 *     summary: Get public packs
 *     tags: [Packs]
 *     responses:
 *       '200':
 *         description: Successful response with public packs
 *       '500':
 *         description: Error retrieving public packs
 */
router.get("/", getPublicPacks);

/**
 * @swagger
 * /pack/{ownerId}:
 *   get:
 *     summary: Get packs by owner ID
 *     tags: [Packs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the owner
 *     responses:
 *       '200':
 *         description: Successful response with packs by owner ID
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving packs by owner ID
 */
router.get("/:ownerId", validator.getPacks, auth ,getPacks);

/**
 * @swagger
 * /pack/p/{packId}:
 *   get:
 *     summary: Get pack by ID
 *     tags: [Packs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: packId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pack
 *     responses:
 *       '200':
 *         description: Successful response with pack by ID
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving pack by ID
 */
router.get("/p/:packId", validator.getPackById, auth,getPackById);

/**
 * @swagger
 * /pack/score/{packId}:
 *   put:
 *     summary: Score a pack
 *     tags: [Packs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: packId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pack
 *     responses:
 *       '200':
 *         description: Successful response after scoring the pack
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error scoring the pack
 */
router.put("/score/:packId", validator.getPackById, auth,scorePack);

/**
 * @swagger
 * /pack:
 *   post:
 *     summary: Add a pack
 *     tags: [Packs]
*     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               owner_id:
 *                 type: string
 *               is_public:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Successful response after adding the pack
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error adding the pack
 */
router.post("/", validator.addPack, auth,addPack);

/**
 * @swagger
 * /pack:
 *   put:
 *     summary: Edit a pack
 *     tags: [Packs]
*     security:
 *       - bearerAuth: []
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
 *               is_public:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Successful response after editing the pack
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error editing the pack
 */
router.put("/", validator.editPack, auth,editPack);

/**
 * @swagger
 * /pack:
 *   delete:
 *     summary: Delete a pack
 *     tags: [Packs]
*     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response after deleting the pack
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error deleting the pack
 */
router.delete("/", validator.deletePack, auth,deletePack);

export default router;
