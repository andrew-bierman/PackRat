import Template from "../../models/templateModel.js";

/**
 * Edits a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the template is edited.
 */
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