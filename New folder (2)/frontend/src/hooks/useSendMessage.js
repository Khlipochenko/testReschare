// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useConversation } from '../context/ConversationContext';
// import { useGetMessages } from './useGetMessages';

// export const useSendMessage = () => {
//     const [messages, setMessages] = useState([]);
//     const { conversationId, setConversationId } = useConversation();
//     const url = import.meta.env.VITE_URL;
//     const { getMessages } = useGetMessages();

//     const sendMessage = async ({ senderId, receiverId, message }) => {
//         try {
//             const res = await fetch(`${url}/api/messages`, {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ senderId, receiverId, conversationId, message }),
//             });

//             if (!res.ok) {
//                 throw new Error('Failed to send message');
//             }

//             const responseData = await res.json();
//             toast.success('message sent')
//             if (!responseData || !responseData.data) {
//                 throw new Error('Invalid response from backend');
//             }

//             const newMessage = responseData.data;
//             setMessages((prev) => [...prev, newMessage]);

//             // Update conversationId globally if it's not set
//             if (!conversationId && newMessage.conversationId) {
//                 setConversationId(newMessage.conversationId);
//             }

//             getMessages(); // Refresh messages after sending
//             return newMessage;
//         } catch (error) {
//             console.error("Error in sendMessage:", error.message);
//             toast.error(error.message);
//         }
//     };

//     return { sendMessage, messages };
// };


// // import { useState } from 'react';
// // import { toast } from 'react-toastify';
// // import { useGetMessages } from './useGetMessages';

// // export const useSendMessage = () => {
// //     const [messages, setMessages] = useState([]);
// //     const [conversationId, setConversationId] = useState(null);
// //     const url = import.meta.env.VITE_URL;
// //     const { getMessages } = useGetMessages(conversationId);

// //     const sendMessage = async ({ senderId, receiverId, conversationId, message }) => {
// //         try {
// //             const res = await fetch(`${url}/api/messages`, {
// //                 method: 'POST',
// //                 credentials: 'include',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({ senderId, receiverId, conversationId, message }),
// //             });

// //             if (!res.ok) {
// //                 throw new Error('Failed to send message');
// //             }

// //             const responseData = await res.json();
// //             console.log("✅ Message sent response:", responseData);

// //             if (!responseData || !responseData.data) {
// //                 throw new Error('Invalid response from backend');
// //             }

// //             const newMessage = responseData.data;
// //             setMessages((prev) => [...prev, newMessage]);

// //             // ✅ Fix: Set conversationId if it's not already set
// //             if (!conversationId && newMessage.conversationId) {
// //                 setConversationId(newMessage.conversationId);
// //             }

// //             getMessages(); // Refresh message list after sending
// //             return newMessage;
// //         } catch (error) {
// //             console.error("❌ Error in sendMessage:", error.message);
// //             toast.error(error.message);
// //         }
// //     };

// //     return { sendMessage, messages, conversationId, setConversationId };
// // };











// // import { useState } from 'react';
// // import { toast } from 'react-toastify';

// // export const useSendMessage = () => {
// //     const [messages, setMessages] = useState([]);
// //     const [conversationId, setConversationId] = useState(null);
// //     const url = import.meta.env.VITE_URL;

// //     const sendMessage = async ({ senderId, receiverId, message }) => {
// //         try {
// //             const res = await fetch(`${url}/api/messages`, {
// //                 method: 'POST',
// //                 credentials: 'include',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({ senderId, receiverId, message, conversationId }),
// //             });

// //             if (!res.ok) {
// //                 throw new Error('Failed to send message');
// //             }

// //             const responseData = await res.json();
// //             console.log("✅ Backend response:", responseData);

// //             if (!responseData || !responseData.data) {
// //                 throw new Error('Invalid response from backend');
// //             }

// //             const newMessage = responseData.data;

// //             setMessages((prevMessages) => [...prevMessages, newMessage]);

// //             // ✅ Ensure conversationId updates
// //             if (!conversationId && newMessage.conversationId) {
// //                 console.log(`🔄 Setting conversationId: ${newMessage.conversationId}`);
// //                 setConversationId(newMessage.conversationId);
// //             } else {
// //                 console.log("⚠️ No new conversationId received!");
// //             }

// //             return newMessage;
// //         } catch (error) {
// //             console.error("❌ Error in sendMessage:", error.message);
// //             toast.error(error.message);
// //         }
// //     };

// //     return { sendMessage, messages, conversationId, setConversationId };
// // };




// // import { useState } from 'react'
// // import { toast } from 'react-toastify'

// // export const useSendMessage = () => {
// //     const [messages, setMessages] = useState([]);
// //     const [conversationId, setConversationId] = useState(null)
// //     const url = import.meta.env.VITE_URL;
// //     const sendMessage = async ({ senderId, receiverId, message }) => {
// //         try {

// //             const res = await fetch(`${url}/api/messages`, {
// //                 method: 'POST',
// //                 credentials: 'include',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify({ senderId, receiverId, message, conversationId })
// //             })

// //             if (!res.ok) {
// //                 throw new Error('failed to send message')
// //             }
// //             const data = await res.json()
// //             console.log('message sent')
// //             console.log('✅ Message sent:', data);
// //             // toast.success('message sent')
// //             if (!data.conversationId) {
// //                 console.error("❌ Backend did not return a conversationId!");
// //             }
// //             setMessages((prevMessages) => [...prevMessages, data.data]);
// //             if (!conversationId) {
// //                 console.log("🔄 Updating conversationId:", data.conversationId);
// //                 setConversationId(data.data.conversationId)
// //             }
// //             return data;
// //         } catch (error) {
// //             toast.error(error.message)


// //         }

// //     };

// //     return { sendMessage, messages, conversationId, setConversationId }

// // }
