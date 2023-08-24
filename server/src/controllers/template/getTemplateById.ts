import Template from '../../models/templateModel'

/**
 * Retrieves a template by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the template or rejects with an error.
 */
export const getTemplateById = async (req, res) => {
  const { templateId } = req.params

  try {
    const template = await Template.findById(templateId).populate(
      'createdBy',
      'username'
    )
    if (template) {
      res.json(template)
    } else {
      res.status(404).json({ message: 'Template not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}
