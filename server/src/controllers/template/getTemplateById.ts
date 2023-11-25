import { publicProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

import { z } from 'zod';

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
      const { prisma }: any = opts;

      const template = await prisma.template.findUnique({
        where: {
          id: templateId,
        },
        include: {
          createdBy: {
            select: {
              username: true,
            },
          },
        } as never,
      });
      return template;
    });
}
