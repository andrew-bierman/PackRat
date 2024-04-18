import { getAIResponseService } from '../../services/openAi/openAi.service';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';
// import { getAIResponseService } from './langchain';

/**
 * Retrieves an AI response based on user input and conversation history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The AI response and updated conversation object.
 */
export const getAIResponse = async (req, res, next) => {
  try {
    const { userId, userInput, itemTypeId } = req.body;

    const result = await getAIResponseService(userId, userInput, itemTypeId);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(GetResponseFromAIError);
  }
};

export function getAIResponseRoute() {
  return publicProcedure
    .input(
      z.object({
        userId: z.string(),
        userInput: z.string(),
        itemTypeId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { userId, userInput, itemTypeId } = opts.input;
      return getAIResponseService(userId, userInput, itemTypeId);
    });
}
