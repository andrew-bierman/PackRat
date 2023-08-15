import mongoose from "mongoose";
import User from "../../models/userModel.ts";
import Conversation from "../../models/openai/conversationModel.ts";
import { Configuration, OpenAIApi } from "openai";

/**
 * Retrieves an AI response based on user input and conversation history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The AI response and updated conversation object.
 */
export const getAIResponse = async (req, res) => {
  if (!process.env.OPENAI_API_KEY)
    return res.status(500).json({ error: "Failed to get response from AI." });

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

    let conversation = await Conversation.findOne({
      userId,
      _id: conversationId, // use _id here
    });

    console.log("conversation after find ---->", conversation)

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

    messages.push({ role: "user", content: userInput });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const aiResponse = response.data.choices[0].message.content.trim();
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