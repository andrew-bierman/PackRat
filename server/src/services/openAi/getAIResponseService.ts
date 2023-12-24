import { PrismaClient } from '@prisma/client/edge';
import { Configuration, OpenAIApi } from 'openai';
import { Conversation } from '../../drizzle/methods/Conversation';
import { User } from '../../drizzle/methods/User';
// import { prisma } from '../../prisma';

/**
 * Retrieves AI response for a given user input in a conversation.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @param {string} conversationId - The ID of the conversation.
 * @param {string} userInput - The user input in the conversation.
 * @returns {Object} - The AI response and the updated conversation.
 */
export const getAIResponseService = async (
  userId,
  conversationId,
  userInput,
  openAIAPIKey = null,
) => {
  if (!openAIAPIKey) {
    throw new Error(
      'Failed to get response from AI. OPENAI_API_KEY is not set.',
    );
  }

  const conversationClass = new Conversation();
  const userClass = new User();
  const configuration = new Configuration({
    apiKey: openAIAPIKey,
  });

  const openai = new OpenAIApi(configuration);

  const user = await userClass.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  let conversation: any = await conversationClass.findUniqueConversation({
    where: { userId, id: conversationId },
  });

  console.log('conversation after find ---->', conversation);

  let conversationHistory = conversation ? conversation.history : '';
  const messages = conversationHistory
    ? conversationHistory.split('\n').map((message, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: message,
    }))
    : [
      {
        role: 'system',
        content:
          'You are a helpful Outdoor Adventure Planning assistant for PackRat. Please assist the user with planning their trip using the following information:',
      },
    ];

  messages.push({ role: 'user', content: userInput });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
  } as any);

  const aiResponse = response.data.choices[0].message.content.trim();
  conversationHistory += `\n${userInput}\nAI: ${aiResponse}`;

  if (conversation) {
    // Update existing conversation
    await conversationClass.update({ history: conversationHistory }, conversation.id);
  } else {
    // Create new conversation
    conversation = await conversationClass.create({
      data: {
        userId,
        history: conversationHistory,
      },
    });
  }

  return {
    aiResponse,
    conversation: conversation,
  };
};
