import { getAISuggestionService } from '../../services/openAi/openAi.service';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';

/**
 * Retrieves an AI response based on user input and conversation history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The AI response and updated conversation object.
 */

export function getAISuggestionsRoute() {
  return publicProcedure
    .input(
      z.object({
        userId: z.string(),
        itemTypeId: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { env } = opts.ctx;
      const { userId, itemTypeId, type } = opts.input;
      return getAISuggestionService(
        userId,
        itemTypeId,
        type,
        env.OPENAI_API_KEY,
      );
    });
}
