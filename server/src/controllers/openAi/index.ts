import { Application, Request, Response } from 'express';
import Base from '../Base';
import { getAIResponse } from './getAIResponse';
import { getUserChats } from './getUserChats';

export default class OpenAiController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/openai', this.router);
        express.use("/api/openai", this.router);
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
         *                 type: string
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
        this.router.post('/ai-response', getAIResponse);

        this.router.get('/user-chats/:userId', getUserChats);
    }
}
