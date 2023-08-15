import Template from "../../models/templateModel.js";

/**
 * Retrieves templates from the database and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} - The templates retrieved from the database.
 */
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({}).populate("createdBy", "username");
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};