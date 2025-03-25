import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";
import { io } from "../socket/socket.js";


export const sendMessage = async (data) => {
    try {
        // Directly extract from data (since there's no req.body)
        const { senderId, receiverId, message, conversationId } = data;

        console.log("📩 Incoming message data:", { senderId, receiverId, message, conversationId });

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderId, receiverId], messages: [] });
            console.log("🆕 New conversation created:", conversation._id);
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            conversationId: conversation._id
        });

        await newMessage.save();
        console.log("✅ Message saved in MongoDB:", newMessage);

        // Update conversation with the new message
        conversation.messages.push(newMessage._id);
        await conversation.save();

        return { success: true, data: newMessage };
    } catch (error) {
        console.error("❌ Error saving message:", error);
        return { success: false, error: error.message };
    }
};





















export const getMessagesConversation = async (req, res, next) => {
    try {
        const { conversationId } = req.params;

        const conversation = await Conversation.findById(conversationId).populate('messages');
        if (!conversation) {
            return res.status(404).json({ message: 'no conversation found between these two users' })
        }

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log('error in the getMessagesConversation: ', error.message);
        next(error)
    }

}