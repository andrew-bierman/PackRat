import Template from '../../models/templateModel'
import { editTemplateService } from '../../services/template/template.service'

/**
 * Edits a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the template is edited.
 */
export const editTemplate = async (req, res) => {
  const { templateId } = req.params
  const { type, isGlobalTemplate } = req.body

  try {
    const updatedTemplate = await editTemplateService(templateId, type, isGlobalTemplate)

    res.json(updatedTemplate)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}
