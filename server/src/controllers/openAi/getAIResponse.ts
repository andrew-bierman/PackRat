import { getAIResponseService } from '../../services/openAi/openAi.service';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';
// import { getAIResponseService } from './langchain';
import { GetResponseFromAIError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Retrieves an AI response based on user input and conversation history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The AI response and updated conversation object.
 */
// export const getAIResponse = async (req, res, next) => {
//   console.log('Helooooooooooooooooooooooooo');
//   try {
//     const { userId, userInput, itemTypeId } = req.body;

//     const result = await getAIResponseService(userId, userInput, itemTypeId);

//     res.locals.data = result;
//     responseHandler(res);
//   } catch (error) {
//     next(GetResponseFromAIError);
//   }
// };

export function getAIResponseRoute() {
  return publicProcedure
    .input(
      z.object({
        userId: z.string(),
        userInput: z.string(),
        itemTypeId: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { env } = opts.ctx;
      const { userId, userInput, itemTypeId, type } = opts.input;
      return getAIResponseService(
        userId,
        itemTypeId,
        userInput,
        type,
        env.OPENAI_API_KEY,
      );
    });
}
