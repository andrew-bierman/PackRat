import type { PrismaClient, TemplateType } from '@prisma/client/edge';

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
  prisma: PrismaClient,
  type: TemplateType,
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

    await prisma.template.create({
      data: {
        type,
        templateId,
        isGlobalTemplate,
        createdByDocument: {
          connect: { id: createdBy },
        },
      },
    });
  } catch (error) {
    throw new Error(error.toString());
  }
};
