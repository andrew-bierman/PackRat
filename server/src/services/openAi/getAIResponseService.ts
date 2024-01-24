import OpenAI from 'openai';
import { Conversation } from '../../drizzle/methods/Conversation';
import { User } from '../../drizzle/methods/User';

/**
 * Retrieves AI response for a given user input in a conversation.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @param {string} conversationId - The ID of the conversation.
 * @param {string} userInput - The user input in the conversation.
 * @returns {Object} - The AI response and the updated conversation.
 */
export const getAIResponseService = async (
  userId: string,
  conversationId: string,
  userInput: string,
  openAIAPIKey = null,
): Promise<object> => {
  if (!openAIAPIKey) {
    throw new Error(
      'Failed to get response from AI. OPENAI_API_KEY is not set.',
    );
  }

  const conversationClass = new Conversation();
  const userClass = new User();
  const openai = new OpenAI({
    apiKey: openAIAPIKey,
  });
  const user = await userClass.findUser({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  let conversation: any = await conversationClass.findConversation(
    userId,
    conversationId,
  );

  console.log('conversation after find ---->', conversation);

  let conversationHistory = conversation ? conversation.history : '';
  const messages = conversationHistory
    ? conversationHistory.split('\n').map((message: any, i: number) => ({
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

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });

  const aiResponse = response.choices[0].message.content.trim();
  conversationHistory += `\n${userInput}\nAI: ${aiResponse}`;

  if (conversation) {
    // Update existing conversation
    await conversationClass.update({
      history: conversationHistory,
      id: conversation.id,
    });
  } else {
    // Create new conversation
    conversation = await conversationClass.create({
      userId,
      history: conversationHistory,
    });
  }
  return {
    aiResponse,
    conversation,
  };
};
