import { publicProcedure, protectedProcedure } from '../../trpc';
import { UserNotFoundError } from '../../helpers/errors';
import { addTemplateService } from '../../services/template/template.service';
import { User } from '../../drizzle/methods/User';
import * as validator from '@packrat/validations';
export const addTemplate = async (c) => {
  try {
    const { type, templateId, isGlobalTemplate, createdBy } =
      await c.req.json();
    const userClass = new User();
    const user = await userClass.findUser({ userId: createdBy });
    if (!user) {
      throw new Error(UserNotFoundError.message);
    }
    await addTemplateService(type, templateId, isGlobalTemplate, createdBy);
    return c.json({ message: 'Template added successfully' }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function addTemplateRoute() {
  return protectedProcedure
    .input(validator.addTemplate)
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
