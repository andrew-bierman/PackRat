import mongoose from "mongoose";
import User from "../models/userModel.js";
import Conversation from "../models/openai/conversationModel.js";
import { Configuration, OpenAIApi } from "openai";

export const getUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const conversations = await Conversation.find({ userId }).exec();

    res.json({conversations: conversations});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user chats." });
  }
};

export const getAIResponse = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const { userId, conversationId, userInput } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    let user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user", user);

    let conversation = await Conversation.findOne({
      userId,
      id: conversationId,
    });
    let conversationHistory = conversation ? conversation.history : "";

    const prompt = conversationHistory + "\n" + userInput;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Outdoor Adventure Planning assistant for PackRat. Please assist the user with planning their trip using the following information:",
        },
        { role: "user", content: userInput },
      ],
      //   maxTokens: 100, // Limit the length of the response
      //   temperature: 0.5, // Control the randomness of the response
      //   topP: 1, // Control the diversity of the response
      //   frequencyPenalty: 0, // Control the repetition of the response
      //   presencePenalty: 0, // Control the sensitivity to the input message
    });

    const aiResponse = response.data.choices[0].message.content.trim();
    conversationHistory = prompt + "\nAI: " + aiResponse;

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

    res.json({
      aiResponse,
      conversationHistory,
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).json({ error: "Failed to get response from AI." });
  }
};
