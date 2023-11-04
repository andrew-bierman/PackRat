import { prisma } from "../../prisma/index";
/**
 * Adds a template to the database.
 * @param {string} type - The type of the template.
 * @param {string} templateId - The ID of the template.
 * @param {boolean} isGlobalTemplate - Whether the template is a global template or not.
 * @param {string} createdBy - The ID of the user who created the template.
 * @return {Promise<void>} The created template.
 */
export const addTemplateService = async (
  type: string,
  templateId: string,
  isGlobalTemplate: boolean,
  createdBy: string,
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: createdBy,
      },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const createdTemplate = await prisma.template.create({
      data : {
        type,
        templateId,
        isGlobalTemplate,
        createdBy: {
          connect: { id: createdBy },
        }as any,
      } as any ,
    });
    
  } catch (error) {
    throw new Error(error.toString());
  }
};
