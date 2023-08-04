import Template from "../models/templateModel.js";
import User from "../models/userModel.js";

// Get all templates
export const getTemplates = async (req, res) => {
  try {
    // Fetch all templates and populate the createdBy field with the username of the user who created the template
    const templates = await Template.find({}).populate("createdBy", "username");
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Get a template by its ID
export const getTemplateById = async (req, res) => {
  const { templateId } = req.params;

  try {
    // Find the template by its ID and populate the createdBy field with the username of the user who created the template
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

// Add a new template
export const addTemplate = async (req, res) => {
  const { type, templateId, isGlobalTemplate, createdBy } = req.body;

  // Check if the user exists
  const user = await User.findById(createdBy);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Create a new template instance with the provided data
  const template = new Template({
    type,
    templateId,
    isGlobalTemplate,
    createdBy,
  });

  try {
    // Save the new template to the database
    const createdTemplate = await template.save();
    res.status(201).json(createdTemplate);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Edit an existing template
export const editTemplate = async (req, res) => {
  const { templateId } = req.params;
  const { type, isGlobalTemplate } = req.body;

  try {
    // Find the template by its ID
    const template = await Template.findById(templateId);

    if (template) {
      // Update the template fields with the new data if provided, otherwise keep the existing values
      template.type = type || template.type;
      template.isGlobalTemplate =
        isGlobalTemplate !== undefined
          ? isGlobalTemplate
          : template.isGlobalTemplate;

      // Save the updated template to the database
      const updatedTemplate = await template.save();
      res.json(updatedTemplate);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Delete a template by its ID
export const deleteTemplate = async (req, res) => {
  const { templateId } = req.params;

  try {
    // Find the template by its ID
    const template = await Template.findById(templateId);

    if (template) {
      // Remove the template from the database
      await template.remove();
      res.json({ message: "Template removed" });
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
