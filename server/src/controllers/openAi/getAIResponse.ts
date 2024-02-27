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

export function getAIResponseRoute() {
  return publicProcedure
    .input(
      z.object({
        userId: z.string(),
        conversationId: z.string(),
        userInput: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { userId, conversationId, userInput } = opts.input;
      const { env }: any = opts.ctx;
      const openAIAPIKey = env.OPENAI_API_KEY;
      return await getAIResponseService(
        userId,
        conversationId,
        userInput,
        openAIAPIKey,
      );
    });
}
