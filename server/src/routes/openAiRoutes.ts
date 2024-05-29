import { Hono } from 'hono';
import {
  getAIResponseRoute as getAIResponse,
  getUserChatsRoute as getUserChats,
} from '../controllers/openAi/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = new Hono();

/**
 * @swagger
 * /openai/ai-response:
 *   post:
 *     summary: Generate AI response based on user input and conversation history
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID.
 *               conversationId:
 *                 type: string
 *                 description: The conversation's ID.
 *               userInput:
 *authTokenMiddleware as any,as any,e: string
 *                 description: The user's input message.
 *             example:
 *               userId: "user1"
 *               conversationId: "conversation1"
 *               userInput: "Hello, AI!"
 *     responses:
 *       200:
 *         description: The AI's response message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 aiResponse:
 *                   type: string
 *                   description: The AI's response message.
 *                 conversationHistory:
 *                   type: string
 *                   description: The complete conversation history, including the new messages.
 *               example:
 *                 aiResponse: "Hello, user!"
 *                 conversationHistory: "User: Hello, AI!\nAI: Hello, user!"
 */
router.post(
  '/ai-response',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(getAIResponse),
);

router.get(
  '/user-chats/:userId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(getUserChats),
);

export default router;
