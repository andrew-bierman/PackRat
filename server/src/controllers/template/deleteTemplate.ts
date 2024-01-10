import { publicProcedure } from '../../trpc';
import { TemplateNotFoundError } from '../../helpers/errors';
import { z } from 'zod';
import { Template } from '../../drizzle/methods/template';

// import { prisma } from '../../prisma';

/**
 * Deletes a template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the template is deleted.
 */
// export const deleteTemplate = async (req, res, next) => {
//   const { templateId } = req.params;
//   const template = await prisma.template.findUnique({
//     where: {
//       id: templateId,
//     },
//   });

//   if (template) {
//     await prisma.template.delete({
//       where: {
//         id: templateId,
//       },
//     });
//     res.json({ message: 'Template removed' });
//   } else {
//     next(TemplateNotFoundError);
//   }
// };

export function deleteTemplateRoute() {
  const templateClass = new Template();
  return publicProcedure
    .input(z.object({ templateId: z.string() }))
    .mutation(async (opts) => {
      const { templateId } = opts.input;
      const template = await templateClass.findTemplate(templateId);
      if (template) {
        await templateClass.delete(templateId);
        return { message: 'Template removed' };
      } else {
        throw new Error(TemplateNotFoundError.message);
      }
    });
}
