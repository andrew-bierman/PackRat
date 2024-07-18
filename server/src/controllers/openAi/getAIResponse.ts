import { getAIResponseService } from '../../services/openAi/openAi.service';
import { publicProcedure, protectedProcedure } from '../../trpc';
import { z } from 'zod';

interface AIResponseServiceResult {
  aiResponse: any;
  conversation: any;
}

export const getAIResponse = async (c) => {
  try {
    const { userId, userInput, itemTypeId, type } = await c.req.parseBody();
    const { aiResponse, conversation } = (await getAIResponseService(
      userId,
      itemTypeId,
      userInput,
      type,
      c.env.OPENAI_API_KEY,
    )) as AIResponseServiceResult;
    return c.json({ aiResponse, conversation });
  } catch (error) {
    return c.json(
      { error: `Failed to get AI response: ${error.message}` },
      500,
    );
  }
};
export function getAIResponseRoute() {
  return protectedProcedure
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
