import { getUserChatsService } from "../../services/openAi/openAi.service";


/**
 * Retrieves the chats of a user.
 * @param {string} req.params.userId - The ID of the user.
 * @returns {object} The conversations of the user.
 */
export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await getUserChatsService(userId);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user chats." });
  }
};