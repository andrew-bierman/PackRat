import Template from "../models/templateModel.js";
import User from "../models/userModel.js";

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({}).populate("createdBy", "username");
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getTemplateById = async (req, res) => {
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
};

export const addTemplate = async (req, res) => {
  const { type, templateId, isGlobalTemplate, createdBy } = req.body;

  //   check if user exists
  const user = await User.findById(createdBy);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  //   const createdBy = req.user._id;  // Assumes you have some kind of authentication middleware

  const template = new Template({
    type,
    templateId,
    isGlobalTemplate,
    createdBy,
  });

  try {
    const createdTemplate = await template.save();
    res.status(201).json(createdTemplate);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const editTemplate = async (req, res) => {
  const { templateId } = req.params;
  const { type, isGlobalTemplate } = req.body;

  try {
    const template = await Template.findById(templateId);

    if (template) {
      template.type = type || template.type;
      template.isGlobalTemplate =
        isGlobalTemplate !== undefined
          ? isGlobalTemplate
          : template.isGlobalTemplate;
      const updatedTemplate = await template.save();
      res.json(updatedTemplate);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const deleteTemplate = async (req, res) => {
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
};
