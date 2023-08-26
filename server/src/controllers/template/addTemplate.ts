import User from '../../models/userModel';
import { addTemplateService } from '../../services/template/template.service';

/**
 * Adds a template to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The created template.
 */
export const addTemplate = async (req, res) => {
  try {
    const { type, templateId, isGlobalTemplate, createdBy } = req.body;

    const user = await User.findById(createdBy);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await addTemplateService(type, templateId, isGlobalTemplate, createdBy);

    res.status(201).json({ message: 'Template created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
