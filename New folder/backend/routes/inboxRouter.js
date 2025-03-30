import { Router } from "express"
import { createConversation, getConversations } from "../controllers/chatController.js"
import { deleteChat } from "../controllers/chatController.js"

import { authMiddleware } from '../middleware/auth.js'

export const inboxRouter = Router()

// inboxRouter.post("/:conversationId", createChat)
//hier wichtig ich habe diese route geändert weil es sich immer auf die createChat warum auch immer bezogen hat im frontend.
inboxRouter.post("/start/:receiverId", createConversation)
inboxRouter.get("/:userId", authMiddleware, getConversations)
inboxRouter.delete("/:conversationId", deleteChat)