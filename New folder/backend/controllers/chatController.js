// import { Message } from "../models/Message.js";
import { Conversation } from "../models/Conversation.js";

export const getConversations = async (req, res, next) => {
    try {

        const userId = req.user.userId
        console.log('userId for getConversations: ', userId)
        const currentUserChats = await Conversation.find({
            participants: userId
        }).populate("participants", "username")

        res.status(200).json({ currentUserChats })
    } catch (error) {
        console.error("Error in getConversations: ", error.message)
        next(error)
    }
}


// receiverId als parameter 

export const createConversation = async (req, res) => {
    try {
        const receiverId = req.params.receiverId // Schenker Id
        const senderId = req.body.senderId // Aktuell eingloggter User Id
        const { itemId } = req.body
        console.log("Received senderId:", senderId);
        console.log("Received receiverId:", receiverId);
        if (!senderId || !receiverId || !itemId) {
            return res.status(400).json({ message: "item, Sender and receiver are required" });
        }
        if (senderId === receiverId) {
            return res.status(400).json({ message: 'no messages to yourself use a note' })
        }
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
            itemId: itemId
        }).populate("participants", "name")
        console.log('found conversation from createConversation', conversation)


        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                itemId: itemId
            })
            conversation = await conversation.populate("participants", "name")
        }
        console.log('found conversation from createConversation after create', conversation)
        res.status(201).json({ conversationId: conversation._id })

    } catch (error) {
        console.error("Error in createChatzwei: ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


export const deleteChat = async (req, res) => {
    try {
        const currentConversationId = req.params.conversationId

        const currentConversation = await Conversation.findById(currentConversationId)

        // Nachfragen ob der User sicher ist den chat zu löschen?

        const receiverId = currentConversation.receiverId
        res.status(200).json({ receiverId })

        //await Conversation.findByIdAndDelete(currentConversationId)

    } catch (error) {
        console.error("Error in deleteChat: ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}