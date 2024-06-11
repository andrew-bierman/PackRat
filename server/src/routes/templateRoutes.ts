import { Hono } from 'hono';
import {
  getTemplatesRoute as getTemplates,
  getTemplateByIdRoute as getTemplateById,
  addTemplateRoute as addTemplate,
  editTemplateRoute as editTemplate,
  deleteTemplateRoute as deleteTemplate,
} from '../controllers/template/index';
import { isAdmin } from '../middleware/isAdmin'; // Assuming this is your middleware file
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

// import * as validator from "@packrat/validations";

// TODO - add validators, this is just a placeholder
// REMOVED THIS SINCE VALIDATION IS NOT REALLY DONE HERE
// const validator = {
//   getTemplateById: (req,res,next) => next(),
//   addTemplate: (req,res,next) => next(),
//   editTemplate: (req,res,next) => next(),
//   deleteTemplate: (req,res,next) => next(),
// };

const router = new Hono();

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Template routes
 */

/**
 * @swagger
 * /template:
 *   get:
 *     summary: Get all templates
 *     tags: [Templates]
 *     responses:
 *       '200':
 *         description: Successful response with all templates
 *       '500':
 *         description: Error retrieving templates
 */
router.get(
  '/',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(getTemplates),
);

/**
 * @swagger
 * /template/{templateId}:
 *   get:
 *     summary: Get template by ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the template
 *     responses:
 *       '200':
 *         description: Successful response with template by ID
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error retrieving template by ID
 */
router.get(
  '/:templateId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(getTemplateById),
);

/**
 * @swagger
 * /template:
 *   post:
 *     summary: Add a template
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               templateId:
 *                 type: string
 *               isGlobalTemplate:
 *                 type: boolean
 *               createdBy:
 *                type: string
 *     responses:
 *       '200':
 *         description: Successful response after adding the template
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error adding the template
 */
router.post(
  '/',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  isAdmin as any,
  tryCatchWrapper(addTemplate),
);

/**
 * @swagger
 * /template/{templateId}:
 *   put:
 *     summary: Edit a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               isGlobalTemplate:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Successful response after editing the template
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error editing the template
 */
router.put(
  '/:templateId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  isAdmin as any,
  tryCatchWrapper(editTemplate),
);

/**
 * @swagger
 * /template/{templateId}:
 *   delete:
 *     summary: Delete a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the template
 *     responses:
 *       '200':
 *         description: Successful response after deleting the template
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Error deleting the template
 */
router.delete(
  '/:templateId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  isAdmin as any,
  tryCatchWrapper(deleteTemplate),
);

export default router;
