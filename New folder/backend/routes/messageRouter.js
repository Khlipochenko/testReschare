import { Router } from "express";
export const messageRouter = Router()
import { sendMessage, getMessagesConversation } from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/auth.js";

messageRouter.post('/', authMiddleware, sendMessage)
messageRouter.get('/:conversationId', authMiddleware, getMessagesConversation)