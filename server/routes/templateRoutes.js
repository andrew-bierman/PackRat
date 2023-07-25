import express from "express";
import {
  getTemplates,
  getTemplateById,
  addTemplate,
  editTemplate,
  deleteTemplate,
} from "../controllers/templateController.js";
import { isAdmin } from "../middleware/isAdmin.js"; // Assuming this is your middleware file
import middlewareHandler from "../middleware/index.js";
// import * as validator from "../middleware/validators/index.js";

// TODO - add validators, this is just a placeholder
const validator = {
  getTemplateById: (req, res, next) => next(),
  addTemplate: (req, res, next) => next(),
  editTemplate: (req, res, next) => next(),
  deleteTemplate: (req, res, next) => next(),
};

const router = express.Router();

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
router.get("/", [middlewareHandler.auth.verifyUserToken],getTemplates);

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
router.get("/:templateId",[middlewareHandler.auth.verifyUserToken], validator.getTemplateById, getTemplateById);

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
router.post("/", [middlewareHandler.auth.verifyAdminToken], validator.addTemplate, addTemplate);

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
router.put("/:templateId", [middlewareHandler.auth.verifyAdminToken], validator.editTemplate, editTemplate);

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
  "/:templateId",
  isAdmin,
  validator.deleteTemplate,
  deleteTemplate
);

export default router;
