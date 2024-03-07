import mongoose from 'mongoose';
import User from '../../models/userModel';
import Conversation from '../../models/openai/conversationModel';
import { Configuration, OpenAIApi } from 'openai';

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

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error('User not found');
  }

  let conversation = await Conversation.findOne({
    userId,
    _id: conversationId,
  });

  console.log('conversation after find ---->', conversation);

  let conversationHistory = conversation ? conversation.history : '';
  const messages: any[] = conversationHistory
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
  });

  const aiResponse =
    response?.data?.choices?.[0]?.message?.content?.trim() || '';
  conversationHistory += `\n${userInput}\nAI: ${aiResponse}`;

  if (conversation) {
    // Update existing conversation
    conversation.history = conversationHistory;
  } else {
    // Create new conversation
    conversation = new Conversation({
      userId,
      history: conversationHistory,
    });
  }

  await conversation.save();

  return {
    aiResponse,
    conversation: conversation.toJSON(),
  };
};
