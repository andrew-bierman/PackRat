import { publicProcedure } from '../../trpc';
import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

import { addTemplateService } from '../../services/template/template.service';
import { z } from 'zod';

// import { prisma } from '../../prisma';
import { TemplateType } from '@prisma/client/edge';
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
  return publicProcedure
    .input(
      z.object({
        type: z.nativeEnum(TemplateType),
        templateId: z.string(),
        isGlobalTemplate: z.boolean(),
        createdBy: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { type, templateId, isGlobalTemplate, createdBy } = opts.input;
      const { prisma }: any = opts.ctx;

      const user = await prisma.user.findUnique({
        where: {
          id: createdBy,
        },
      });
      if (!user) {
        throw new Error(UserNotFoundError.message);
      }
      await addTemplateService(
        prisma,
        type,
        templateId,
        isGlobalTemplate,
        createdBy,
      );
      return { message: 'Template added successfully' };
    });
}
