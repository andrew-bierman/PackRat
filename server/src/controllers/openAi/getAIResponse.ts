import { getAIResponseService } from '../../services/openAi/openAi.service';

/**
 * Retrieves an AI response based on user input and conversation history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The AI response and updated conversation object.
 */
export const getAIResponse = async (req, res) => {
  try {
    const { userId, conversationId, userInput } = req.body;

    const result = await getAIResponseService(
      userId,
      conversationId,
      userInput,
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
};
