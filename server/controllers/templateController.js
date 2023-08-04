import express from "express";
import Template from "../models/templateModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// GET /api/templates
router.get("/templates", async (req, res) => {
  try {
    const templates = await Template.find({}).populate("createdBy", "username");
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET /api/templates/:templateId
router.get("/templates/:templateId", async (req, res) => {
  const { templateId } = req.params;

  try {
    const template = await Template.findById(templateId).populate(
      "createdBy",
      "username"
    );
    if (template) {
      res.json(template);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// POST /api/templates
router.post("/templates", async (req, res) => {
  const { type, templateId, isGlobalTemplate, createdBy } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(createdBy);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const template = new Template({
      type,
      templateId,
      isGlobalTemplate,
      createdBy,
    });

    const createdTemplate = await template.save();
    res.status(201).json(createdTemplate);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// PUT /api/templates/:templateId
router.put("/templates/:templateId", async (req, res) => {
  const { templateId } = req.params;
  const { type, isGlobalTemplate } = req.body;

  try {
    const template = await Template.findById(templateId);

    if (template) {
      template.type = type || template.type;
      template.isGlobalTemplate =
        isGlobalTemplate !== undefined ? isGlobalTemplate : template.isGlobalTemplate;
      const updatedTemplate = await template.save();
      res.json(updatedTemplate);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// DELETE /api/templates/:templateId
router.delete("/templates/:templateId", async (req, res) => {
  const { templateId } = req.params;

  try {
    const template = await Template.findById(templateId);

    if (template) {
      await template.remove();
      res.json({ message: "Template removed" });
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
