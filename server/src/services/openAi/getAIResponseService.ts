import OpenAI from 'openai';
import Instructor from '@instructor-ai/instructor';
import { Conversation } from '../../drizzle/methods/Conversation';
import { User } from '../../drizzle/methods/User';
import { getPackInformation } from './referredItemInformation';
/**
 * Retrieves AI response for a given user input in a conversation.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @param {string} itemTypeId - The ID of the conversation.
 * @param {string} userInput - The user input in the conversation.
 * @returns {Object} - The AI response and the updated conversation.
 */

export const getAIResponseService = async (
  userId: string,
  itemTypeId: string,
  userInput: string,
  type: string,
  openAIAPIKey: string,
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

  // Apply the patch to the OpenAI client
  const client = Instructor({
    client: openai,
    mode: 'FUNCTIONS',
  });

  const user = await userClass.findUser({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  let itemInfo;
  switch (type) {
    case 'trip':
      console.log('trip');
      // info = await getTripInformation(itemTypeId);
      break;
    case 'pack':
      itemInfo = await getPackInformation(itemTypeId);
      break;
    default:
      console.log('trip');
      throw new Error(`Invalid type: ${itemTypeId}`);
  }

  let conversation: any = await conversationClass.findConversation(
    userId,
    itemTypeId,
  );

  let conversationHistory = conversation ? conversation.history : '';

  const historyArray = conversationHistory.split(/(User:|AI:)/);
  const messages = historyArray.reduce((accumulator, current, index) => {
    if (index % 3 === 0) return accumulator; // Skip the empty strings from split
    const isAI = current === 'AI:';
    const content = historyArray[index + 1]; // Content is the next item
    const role = isAI ? 'assistant' : 'user';
    if (content?.trim()) {
      // Check if content exists and is not just whitespace
      accumulator.push({ role, content: content.trim() });
    }
    return accumulator;
  }, []);

  // a detailed system message to instruct the model about its role
  const systemMessage = {
    role: 'system',
    content: itemInfo,
  };

  // Add the system message to the beginning of the messages array
  messages.unshift(systemMessage);

  // Add the user message
  messages.push({ role: 'user', content: userInput });

  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.8,
  });

  const aiResponse = response.choices?.[0]?.message?.content?.trim() || '';
  conversationHistory += `\nUser: ${userInput}\nAI: ${aiResponse}`;

  if (conversation) {
    // Update existing conversation
    conversation = await conversationClass.update({
      id: conversation.id,
      history: conversationHistory,
    });
  } else {
    // Create new conversation
    conversation = await conversationClass.create({
      userId,
      itemTypeId,
      history: conversationHistory,
    });
  }
  return {
    aiResponse,
    conversation,
  };
};
