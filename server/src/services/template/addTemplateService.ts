import { User } from '../../drizzle/methods/User';
import { Template } from '../../drizzle/methods/template';

/**
 * Adds a template to the database.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} type - The type of the template.
 * @param {string} templateId - The ID of the template.
 * @param {boolean} isGlobalTemplate - Whether the template is a global template or not.
 * @param {string} createdBy - The ID of the user who created the template.
 * @return {Promise<void>} The created template.
 */
export const addTemplateService = async (
  type: any,
  templateId: string,
  isGlobalTemplate: boolean,
  createdBy: string,
): Promise<void> => {
  try {
    const userClass = new User();
    const templateClass = new Template();
    const user = await userClass.findById(createdBy);
    if (!user) {
      throw new Error('User not found!');
    }
    await templateClass.create({
      type,
      templateId,
      isGlobalTemplate,
      createdBy,
    });
  } catch (error) {
    throw new Error(error.toString());
  }
};
