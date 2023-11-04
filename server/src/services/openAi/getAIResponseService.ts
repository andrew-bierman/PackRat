import { Configuration, OpenAIApi } from 'openai';
import { prisma } from '../../prisma/index';

/**
 * Retrieves AI response for a given user input in a conversation.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} conversationId - The ID of the conversation.
 * @param {string} userInput - The user input in the conversation.
 * @returns {Object} - The AI response and the updated conversation.
 */
export const getAIResponseService = async (
  userId,
  conversationId,
  userInput,
) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      'Failed to get response from AI. OPENAI_API_KEY is not set.',
    );
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  let conversation = await prisma.conversation.findFirst({
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
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { history: conversationHistory },
    });
  } else {
    // Create new conversation
    conversation = await prisma.conversation.create({
      data: {
        userId,
        history: conversationHistory,
      } as any,
    });
  }

  return {
    aiResponse,
    conversation: conversation,
  };
};
