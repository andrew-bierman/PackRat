import Template from "../../models/templateModel.js";
import User from "../../models/userModel.js";

/**
 * Adds a template to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The created template.
 */
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