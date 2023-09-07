import express from 'express';
import { getMaps, getMapById, addMap, deleteMap, editMap } from '../controllers/map/index'; 
import * as validator from '../middleware/validators/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Maps
 *   description: Map routes
 */

/**
 * @swagger
 * /map/{ownerId}:
 *   get:
 *     tags:
 *       - Maps
 *     summary: Get maps by owner ID
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
    validator.getMaps,
    tryCatchWrapper(getMaps),
);
  
/**
 * @swagger
 * /map/m/{mapId}:
 *   get:
 *     tags:
 *       - Maps
 *     summary: Get map by map ID
 *     parameters:
 *       - in: path
 *         name: mapId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
    '/m/:mapId',
    authTokenMiddleware,
    checkRole(['user', 'admin']),
    validator.getMapById,
    tryCatchWrapper(getMapById),
);
  

/**
 * @swagger
 * /map:
 *   post:
 *     tags:
 *       - Maps
 *     summary: Add a new map
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
 *       200:
 *         description: Successful response
 */
router.post(
    '/',
    authTokenMiddleware,
    checkRole(['user', 'admin']),
    validator.addMap,
    tryCatchWrapper(addMap),
);

/**
 * @swagger
 * /map:
 *   put:
 *     tags:
 *       - Maps
 *     summary: Edit an existing map
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
 *               owner_id:
 *                 type: string
 * 
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
    validator.editMap,
    tryCatchWrapper(editMap),
  );
  

/**
 * @swagger
 * /map:
 *   delete:
 *     tags:
 *       - Maps
 *     summary: Delete a map by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mapId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.delete(
    '/',
    authTokenMiddleware,
    checkRole(['user', 'admin']),
    validator.deleteMap,
    tryCatchWrapper(deleteMap),
  );

export default router;