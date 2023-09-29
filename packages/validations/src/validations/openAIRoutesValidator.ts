import { z } from 'zod';
import JoiObjectId from './objectIdValidator';

export const getAIResponse = z.object({
  userId: z.string(),
  conversationId: z.string(),
  userInput: z.string(),
});

export const getUserChats = z.object({
    userId: z.string()
})