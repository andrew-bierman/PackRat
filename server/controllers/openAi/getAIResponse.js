import mongoose from "mongoose";
import User from "../../models/userModel.js";
import Conversation from "../../models/openai/conversationModel.js";
import { Configuration, OpenAIApi } from "openai";

<<<<<<< HEAD:server/controllers/openAiController.js
// Endpoint to get chat conversations for a specific user
export const getUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the provided userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Fetch the user based on the userId
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all conversations associated with the user
    const conversations = await Conversation.find({ userId }).exec();

    // Return the conversations as the response
    res.json({ conversations: conversations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user chats." });
  }
};

// Endpoint to interact with the OpenAI model and get AI responses
=======
/**
 * Retrieves an AI response based on user input and conversation history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The AI response and updated conversation object.
 */
>>>>>>> andrew_testing:server/controllers/openAi/getAIResponse.js
export const getAIResponse = async (req, res) => {
  // Ensure the required OpenAI API key is available
  if (!process.env.OPENAI_API_KEY)
    return res.status(500).json({ error: "Failed to get response from AI." });

  // Create a configuration object for the OpenAI API
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Create an instance of the OpenAI API with the provided configuration
  const openai = new OpenAIApi(configuration);

  const { userId, conversationId, userInput } = req.body;

  try {
    // Check if the provided userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Fetch the user based on the userId
    let user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the conversation with the given conversationId for the user
    let conversation = await Conversation.findOne({
      userId,
      _id: conversationId, // use _id here
    });

    // Prepare the conversation history based on existing messages or a system message for new conversations
    let conversationHistory = conversation ? conversation.history : "";
    let messages = conversationHistory
      ? conversationHistory.split("\n").map((message, i) => ({
          role: i % 2 === 0 ? "user" : "assistant",
          content: message,
        }))
      : [
          {
            role: "system",
            content:
              "You are a helpful Outdoor Adventure Planning assistant for PackRat. Please assist the user with planning their trip using the following information:",
          },
        ];

    // Add the user's input to the messages
    messages.push({ role: "user", content: userInput });

    // Use the OpenAI model to generate AI responses based on the conversation history
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // Extract the AI response from the model's output
    const aiResponse = response.data.choices[0].message.content.trim();
    conversationHistory += `\n${userInput}\nAI: ${aiResponse}`;

    // If the conversation exists, update its history; otherwise, create a new conversation
    if (conversation) {
      conversation.history = conversationHistory;
    } else {
      conversation = new Conversation({
        userId,
        history: conversationHistory,
      });
    }

    // Save the updated or new conversation to the database
    await conversation.save();

    // Return the AI response and the updated conversation data as the response
    res.json({
      aiResponse,
      conversation: conversation.toJSON(),
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).json({ error: "Failed to get response from AI." });
  }
};