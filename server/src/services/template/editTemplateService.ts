import { Template } from '../../drizzle/methods/template';

/**
 * Edits a template.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} templateId - The ID of the template to edit.
 * @param {TemplateType} type - The new type of the template (optional).
 * @param {boolean} isGlobalTemplate - The new value for isGlobalTemplate (optional).
 */
export const editTemplateService = async (
  // prisma: PrismaClient,
  templateId: string,
  type: any,
  isGlobalTemplate: boolean,
) => {
  try {
    const templateClass = new Template();
    const template = await templateClass.findUnique(templateId);
    if (!template) {
      throw new Error('Template not found');
    }
    const updatedTemplate = await templateClass.update({
      templateId,
      type,
      isGlobalTemplate,
    });
    return updatedTemplate;
  } catch (error) {
    throw new Error(error.toString());
  }
};
