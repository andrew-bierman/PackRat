import { publicProcedure, protectedProcedure } from '../../trpc';
import { UserNotFoundError } from '../../helpers/errors';
import { addTemplateService } from '../../services/template/template.service';
import { z } from 'zod';
import { User } from '../../drizzle/methods/User';

// import { prisma } from '../../prisma';
/**
 * Adds a template to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The created template.
 */
// export const addTemplate = async (req, res, next) => {
//   const { type, templateId, isGlobalTemplate, createdBy } = req.body;

//   const user = await prisma.user.findUnique({
//     where: {
//       id: createdBy,
//     },
//   });

//   if (!user) {
//     next(UserNotFoundError);
//   }

//   await addTemplateService(type, templateId, isGlobalTemplate, createdBy);

//   res.locals.data = { message: 'Template added successfully' };
//   responseHandler(res);
// };

export function addTemplateRoute() {
  return protectedProcedure
    .input(
      z.object({
        type: z.any(),
        templateId: z.string(),
        isGlobalTemplate: z.boolean(),
        createdBy: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { type, templateId, isGlobalTemplate, createdBy } = opts.input;
      const userClass = new User();
      const user = await userClass.findUser({ userId: createdBy });
      if (!user) {
        throw new Error(UserNotFoundError.message);
      }
      await addTemplateService(type, templateId, isGlobalTemplate, createdBy);
      return { message: 'Template added successfully' };
    });
}
