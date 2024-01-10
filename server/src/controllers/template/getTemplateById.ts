import { publicProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
// import { responseHandler } from '../../helpers/responseHandler';
import { z } from 'zod';
import { Template } from '../../drizzle/methods/template';

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
  const templateClass = new Template();
  return publicProcedure
    .input(z.object({ templateId: z.string() }))
    .query(async (opts) => {
      const { templateId } = opts.input;
      const template = await templateClass.findTemplate(templateId, true);
      if (!template) {
        throw new Error(TemplateNotFoundError.message);
      }
      return template;
    });
}
