import { publicProcedure } from '../../trpc';

import { prisma } from '../../prisma/index';
/**
 * Retrieves templates from the database and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} - The templates retrieved from the database.
 */
export const getTemplates = async (req, res) => {
  const templates = await prisma.template.findMany({
    include: {
      createdBy: {
        select: {
          username: true,
        },
      },
    } as never,
  } as any);
  res.json(templates);
};

export function getTemplatesRoute() {
  return publicProcedure.query(async (opts) => {
    const templates = await prisma.template.findMany({
      include: {
        createdBy: {
          select: {
            username: true,
          },
        },
      },
    } as any);
    return templates;
  });
}
