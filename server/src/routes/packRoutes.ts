import { Context, Hono, Next } from 'hono';
import {
  getPacksRoute as getPacks,
  getPackByIdRoute as getPackById,
  addPackRoute as addPack,
  editPackRoute as editPack,
  deletePackRoute as deletePack,
  getPublicPacksRoute as getPublicPacks,
  scorePackRoute as scorePack,
  duplicatePublicPackRoute as duplicatePublicPack,
} from '../controllers/pack/index';
import * as validator from '@packrat/validations';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authMiddlewareHTTP from '../middleware/authHTTPS';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';
import { Env } from '../db/client';

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
  authMiddlewareHTTP as any,
  checkRole(['user', 'admin']) as any,
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
  authMiddlewareHTTP as any,
  checkRole(['user', 'admin']) as any,
  (async (c: Context<Env>, next: Next) =>
    zodParser(validator.getPacks, await c.req.param(), next)) as any,
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
  authMiddlewareHTTP as any,
  (async (c: Context<Env>, next: Next) =>
    zodParser(validator.getPackById, await c.req.param(), next)) as any,
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
  authMiddlewareHTTP as any,
  (async (c: Context<Env>, next: Next) =>
    zodParser(validator.getPackById, await c.req.param(), next)) as any,
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
  authMiddlewareHTTP as any,
  (async (c: Context<Env>, next: NExt) =>
    zodParser(validator.addPack, await c.req.json(), next)) as any,
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
  authMiddlewareHTTP as any,
  (async (c: Context<Env>, next: Next) =>
    zodParser(validator.editPack, await c.req.json(), next)) as any,
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
  authMiddlewareHTTP as any,
  (async (c: Context, next: Next) =>
    zodParser(validator.deletePack, await c.req.json(), next)) as any,
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
  authMiddlewareHTTP as any,
  (async (c: Context<Env>, next: Next) =>
    zodParser(validator.duplicatePublicPack, await c.req.json(), next)) as any,
  tryCatchWrapper(duplicatePublicPack),
);

export default router;
