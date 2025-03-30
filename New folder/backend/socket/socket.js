import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { sendMessage } from '../controllers/messageController.js';
import { Conversation } from '../models/Conversation.js';
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.ORIGIN],
        credentials: true
    },
});

const connectedUsers = new Map(); // Store connected users

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register the user with their socket ID
    socket.on('registerUser', (userId) => {
        connectedUsers.set(userId, socket.id);
        console.log(`User registered: ${userId} (Socket: ${socket.id})`);
    });

    // Listen for messages and call sendMessage()
    socket.on("privateMessage", async (data, callback) => {
        try {
            console.log("Received private message:", data);

            const newMessage = await sendMessage(data);

            if (!newMessage.success) {
                throw new Error(newMessage.error);
            }

            const receiverSocketId = connectedUsers.get(data.receiverId);

            // Send message to receiver if they are online
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("privateMessage", newMessage.data);
                console.log(` Message sent to receiver ${data.receiverId}`);
            }

            callback(newMessage.data);

        } catch (error) {
            console.error(" Error sending message:", error);
            callback({ error: "Failed to send message" });
        }
    });

    // Handle real-time conversation creation
    socket.on("createConversation", async (data, callback) => {
        try {
            const { senderId, receiverId, itemId } = data;

            if (!senderId || !receiverId || !itemId) {
                return callback({ error: "Artikel, Absender und Empfänger sind erforderlich." });
            }

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
                itemId: itemId
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                    itemId: itemId
                });
            }

            console.log("✅ Conversation created:", conversation);

            // Emit to the receiver if they are online
            const receiverSocketId = connectedUsers.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newConversation", conversation);
                console.log(`📢 Notified receiver (${receiverId}) of new conversation`);
            }

            callback(conversation);

        } catch (error) {
            console.error("❌ Error creating conversation:", error.message);
            callback({ error: "Failed to create conversation" });
        }
    });



    socket.on('disconnect', () => {
        for (let [userId, socketId] of connectedUsers.entries()) {
            if (socket.id === socketId) {
                connectedUsers.delete(userId);
                console.log(`User ${userId} disconnected.`);
                break;
            }
        }
    });
});

export { io, app, server };
