import Template from "../../models/templateModel";

/**
 * Deletes a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the template is deleted.
 */
export const deleteTemplate = async (req, res) => {
  const { templateId } = req.params;

  try {
    const template: any = await Template.findById(templateId);

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
