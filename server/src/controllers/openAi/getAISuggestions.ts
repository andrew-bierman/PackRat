import { getAISuggestionService } from '../../services/openAi/openAi.service';
import { protectedProcedure } from '../../trpc';
import { z } from 'zod';

interface AIResponseServiceResult {
  aiResponse: any;
  refined: any;
}

export const getAISuggestions = async (c) => {
  try {
    const { userId, itemTypeId, type } = await c.req.parseBody();
    const { aiResponse, refined } = (await getAISuggestionService(
      userId,
      itemTypeId,
      type,
      c.env.OPENAI_API_KEY,
    )) as AIResponseServiceResult;
    return c.json({ aiResponse, refined });
  } catch (error) {
    return c.json(
      { error: `Failed to get AI response: ${error.message}` },
      500,
    );
  }
};

export function getAISuggestionsRoute() {
  return protectedProcedure
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
