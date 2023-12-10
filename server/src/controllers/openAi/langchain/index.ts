import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
import mongoose from 'mongoose';
import User from "../../../models/userModel";
import Conversation from "../../../models/openai/conversationModel";

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
    temperature: 0.9, // Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer.
    maxTokens: 100, // Maximum number of tokens to generate (text output limit)
});

export const getAIResponseService = async (
    userId: string,
    conversationId: string,
    userInput: string,
) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error(
            'Failed to get response from AI. OPENAI_API_KEY is not set.',
        );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log('Invalid userId');
        throw new Error('Invalid userId');
    }

    const user = await User.findById(userId).exec();
    if (!user) {
        console.log('User not found');
        throw new Error('User not found');
    }

    let conversation = await Conversation.findOne({
        userId,
        _id: conversationId,
    });
    console.log('conversation after find ---->', conversation);
    let conversationHistory = conversation ? conversation.history : '';

    const messages = conversationHistory
        ? conversationHistory.split('\n').map((message, i) =>
            i % 2 === 0
                ? new HumanMessage({ content: message })
                : new AIMessage({ content: message })
        )
        : [
            new SystemMessage({
                content:
                    'You are a helpful Outdoor Adventure Planning assistant for PackRat. Please assist the user with planning their trip using the following information:',
            }),
        ];

    messages.push(new HumanMessage({ content: userInput }));

    const chatModelResult = await chatModel.predictMessages(messages);

    const aiResponse = chatModelResult.content.toString().trim();

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
}