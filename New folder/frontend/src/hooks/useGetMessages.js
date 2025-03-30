// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { useConversation } from '../context/ConversationContext';

// export const useGetMessages = () => {
//     const [messages, setMessages] = useState([]);
//     const { conversationId } = useConversation();
//     const url = import.meta.env.VITE_URL;

//     const getMessages = async () => {
//         if (!conversationId) return;

//         try {
//             const res = await fetch(`${url}/api/messages/${conversationId}`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });

//             if (!res.ok) {
//                 throw new Error('Failed to fetch messages');
//             }

//             const responseData = await res.json();

//             console.log("Fetched Messages in useGetMessages:", responseData);
//             console.log('conversationId in useGetMessages: ', conversationId)
//             setMessages(responseData.data);
//         } catch (error) {
//             console.error("Error in getMessages:", error.message);
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => {
//         if (conversationId) {
//             getMessages();
//         }
//     }, [conversationId]); // Fetch messages when conversationId changes

//     return { messages, getMessages };
// };




// // import { useEffect, useState } from 'react'
// // import { toast } from 'react-toastify'

// // export const useGetMessages = (conversationId) => {
// //     const [messages, setMessages] = useState([])
// //     const url = import.meta.env.VITE_URL;
// //     const getMessages = async () => {
// //         if (!conversationId) return
// //         try {
// //             const res = await fetch(`${url}/api/messages/${conversationId}`, {
// //                 method: "GET",
// //                 credentials: "include",
// //                 headers: { "Content-Type": "application/json" }
// //             })
// //             const data = await res.json()
// //             if (!data || data.length === 0) {
// //                 // toast.error('no conversation found')
// //                 toast.info('No messages yet. Start the conversation!');
// //                 return
// //             }
// //             setMessages(data)


// //         } catch (error) {
// //             toast.error(error.message)
// //         }
// //     }
// //     useEffect(() => {
// //         getMessages()
// //     }, [conversationId])

// //     return { messages, getMessages }


// // }