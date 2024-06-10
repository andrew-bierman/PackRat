import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';
import Conversation from '../../../models/openai/conversationModel';
import { getPackByIdService } from '../../../services/pack/pack.service';
import { getTripByIdService } from '../../../services/trip/getTripByIdService';
import mongoose from 'mongoose';
import User from '../../../models/userModel';

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
  temperature: 0.9, // Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer.
  maxTokens: 100, // Maximum number of tokens to generate (text output limit)
});

const prompt =
  'You are a helpful Outdoor Adventure Planning assistant for PackRat. Please assist the user with planning their trip using the following information:';

export const getAIResponseService = async (
  userId: string,
  // conversationId: string | null,
  userInput: string,
  itemTypeId?: string | null,
  packId?: string,
  tripId?: string,
) => {
  // validate
  await Promise.all([checkAPIKey(), validateUser(userId)]);

  // get additional data if present
  const packInfo = await getPackInformation(packId);
  const tripInfo = await getTripInformation(tripId);

  // find last conversation if present
  let conversation = await Conversation.findOne({
    userId,
    // _id: conversationId,
    itemTypeId,
  });

  // if conversation is not found, create a new one
  if (!conversation) {
    conversation = new Conversation({
      userId,
      itemTypeId,
      history: '',
    });
    await conversation.save();
  }

  let conversationHistory = conversation.history || '';

  // format the last conversation history
  const messages = getConversationHistory(conversationHistory, prompt);

  // build the context aware prompt
  const contextAwarePrompt = `${tripInfo}\n${packInfo}\nUser Inquiry: ${userInput}`;
  messages.push(new HumanMessage({ content: contextAwarePrompt }));

  // get response
  const chatModelResult = await chatModel.predictMessages(messages);
  const aiResponse = chatModelResult.content.toString().trim();
  conversationHistory = processConversationHistory(
    conversationHistory,
    userInput,
    aiResponse,
  );

  // save and return the conversation
  conversation = await saveConversationHistory(
    conversation,
    conversationHistory,
  );
  console.log('conversationHistory:', conversation);
  return { aiResponse, conversation };
};

export async function checkAPIKey() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set.');
  }
}

async function getPackInformation(packId) {
  if (!packId) return '';
  const packData: any = await getPackByIdService(packId);
  return `Analyze the pack titled '${packData.name}', owned by ${packData.owners
    .map((owner: any) => owner.name)
    .join(', ')}. 
    This pack contains items like ${packData.items
      .map(
        (item: any) =>
          `${item.name} (${item.weight}, ${item.quantity} pcs, category: ${item.category.name})`,
      )
      .join(', ')}. 
    The pack is ${packData.is_public ? 'public' : 'private'}, favorited by ${
      packData.favorited_by.length
    } users, created on ${new Date(packData.createdAt).toLocaleDateString()}. 
    It is graded as ${packData.grades.weight}, ${
      packData.grades.essentialItems
    }, and ${
      packData.grades.redundancyAndVersatility
    } in weight, essential items, and redundancy/versatility respectively. 
    The scores are: weight ${packData.scores.weightScore}, essential items ${
      packData.scores.essentialItemsScore
    }, and redundancy/versatility ${
      packData.scores.redundancyAndVersatilityScore
    }, 
    totaling ${packData.totalScore} with a total weight of ${
      packData.total_weight
    }g. 
    Provide feedback for optimization considering safety, comfort, and efficiency.`;
}

async function getTripInformation(tripId) {
  if (!tripId) return '';

  const tripData: any = await getTripByIdService(tripId);
  return `Analyze the trip titled '${tripData.name}', described as '${
    tripData.description
  }'. 
    Duration: ${tripData.duration}, Weather: ${
      tripData.weather
    }, from ${new Date(tripData.start_date).toLocaleDateString()} to ${new Date(
      tripData.end_date,
    ).toLocaleDateString()}, 
    heading to ${
      tripData.destination
    }. Destination GeoJSON Details: ${JSON.stringify(
      tripData.geojson,
      null,
      2,
    )}. 
    Owned by ${tripData.owner_id.name}, and it's ${
      tripData.is_public ? 'public' : 'private'
    }. 
    Created on ${new Date(
      tripData.createdAt,
    ).toLocaleDateString()}, last updated on ${new Date(
      tripData.updatedAt,
    ).toLocaleDateString()}. 
    Please provide insights and recommendations for preparation and things to consider for a safe and enjoyable trip.`;
}

function processConversationHistory(
  conversationHistory,
  userInput,
  aiResponse,
) {
  return `${conversationHistory}\nUser: ${userInput}\nAI: ${aiResponse}`;
}

function getConversationHistory(conversationHistory: string, prompt: string) {
  return conversationHistory
    ? conversationHistory
        .split('\n')
        .map((message, i) =>
          i % 2 === 0
            ? new HumanMessage({ content: message })
            : new AIMessage({ content: message }),
        )
    : [
        new SystemMessage({
          content: prompt,
        }),
      ];
}

async function saveConversationHistory(conversation, conversationHistory) {
  conversation.history = conversationHistory;
  await conversation.save();
  return conversation;
}

export async function validateUser(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
