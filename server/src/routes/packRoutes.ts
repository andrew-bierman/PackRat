import { Hono } from 'hono';
import {
  getPacks,
  getPackById,
  addPack,
  editPack,
  deletePack,
  getPublicPacks,
  scorePack,
  duplicatePublicPack,
} from '../controllers/pack/index';
import * as validator from '@packrat/validations';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

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
router.get(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getPublicPacks),
);

/**
 * @swagger
 * /pack/{ownerId}:
 *   get:
 *     summary: Get packs by owner ID
 *     tags: [Packs]
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
router.get(
  '/:ownerId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  (req, res, next) => zodParser(validator.getPacks, req.params, next),
  tryCatchWrapper(getPacks),
);

/**
 * @swagger
 * /pack/p/{packId}:
 *   get:
 *     summary: Get pack by ID
 *     tags: [Packs]
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
router.get(
  '/p/:packId',
  (req, res, next) => zodParser(validator.getPackById, req.params, next),
  tryCatchWrapper(getPackById),
);

/**
 * @swagger
 * /pack/score/{packId}:
 *   put:
 *     summary: Score a pack
 *     tags: [Packs]
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
router.put(
  '/score/:packId',
  (req, res, next) => zodParser(validator.getPackById, req.params, next),
  tryCatchWrapper(scorePack),
);

/**
 * @swagger
 * /pack:
 *   post:
 *     summary: Add a pack
 *     tags: [Packs]
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
router.post(
  '/',
  (req, res, next) => zodParser(validator.addPack, req.body, next),
  tryCatchWrapper(addPack),
);

/**
 * @swagger
 * /pack:
 *   put:
 *     summary: Edit a pack
 *     tags: [Packs]
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
router.put(
  '/',
  (req, res, next) => zodParser(validator.editPack, req.body, next),
  tryCatchWrapper(editPack),
);

/**
 * @swagger
 * /pack:
 *   delete:
 *     summary: Delete a pack
 *     tags: [Packs]
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
router.delete(
  '/',
  (req, res, next) => zodParser(validator.deletePack, req.body, next),
  tryCatchWrapper(deletePack),
);

/**
 * @swagger
 * /pack:
 *   post:
 *     summary: Duplicate a public pack
 *     tags: [Pack]
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
 *         description: Successful response after duplicating the pack
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error duplicating the pack
 */
router.post(
  '/duplicate',
  (req, res, next) => zodParser(validator.duplicatePublicPack, req.body, next),
  tryCatchWrapper(duplicatePublicPack),
);

export default router;
