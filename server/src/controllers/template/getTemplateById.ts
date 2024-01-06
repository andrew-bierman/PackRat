import { publicProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

import { z } from 'zod';
import { type PrismaClient } from '@prisma/client/edge';
import { Template } from '../../prisma/methods';

// import { prisma } from '../../prisma';
/**
 * Retrieves a template by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the template or rejects with an error.
 */
// export const getTemplateById = async (req, res, next) => {
//   const { templateId } = req.params;

//   const template = await prisma.template.findUnique({
//     where: {
//       id: templateId,
//     },
//     include: {
//       createdBy: {
//         select: {
//           username: true,
//         },
//       },
//     } as never,
//   });
//   if (template) {
//     res.locals.data = template;
//     responseHandler(res);
//   } else {
//     next(TemplateNotFoundError);
//   }
// };

export function getTemplateByIdRoute() {
  return publicProcedure
    .input(z.object({ templateId: z.string() }))
    .query(async (opts) => {
      const { templateId } = opts.input;
      const prisma: PrismaClient = (opts.ctx as any).prisma;

      const template = await prisma.template.findUnique({
        where: {
          id: templateId,
        },
        include: {
          createdByDocument: {
            select: {
              username: true,
            },
          },
        },
      });
      return Template(template)?.toJSON();
    });
}
