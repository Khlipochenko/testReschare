import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const url = import.meta.env.VITE_API_URL;
  const { user, loadingUser } = useContext(AuthContext);

  // Socket State
  const [socket, setSocket] = useState(null);

  // Messages & Conversations
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);

  // Handle User Logout
  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  // Initialize Socket Connection
  useEffect(() => {
    if (user) {
      const newSocket = io(url, { withCredentials: true });
      setSocket(newSocket);

      newSocket.emit('registerUser', user._id);
      newSocket.on('connect', () => console.log('Connected to Socket.io'));
      newSocket.on('disconnect', () => console.log('Disconnected from Socket.io'));

      return () => newSocket.disconnect();
    }
  }, [user]);

  // Fetch Conversations
  const getConversations = async () => {
    if (!user) return;
    setLoadingConversations(true);

    try {
      const res = await fetch(`${url}/api/inbox/${user._id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Failed to get conversations');
      const data = await res.json();
      setConversations([...data.currentUserChats]);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoadingConversations(false);
    }
  };

  useEffect(() => {
    if (user) {
      getConversations();
    }
  }, [user, conversationId]);

  //for notification
  const [hasNewConversation, setHasNewConversation] = useState(false);
  const [newConversationId, setNewConversationId] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on('newConversation', (newConversation) => {
        setConversations((prev) => [newConversation, ...prev]);
        setHasNewConversation(true);
        setNewConversationId(newConversation._id);
      });
      return () => socket.off('newConversation');
    }
  }, [socket]);

  const resetNewConversationNotification = () => {
    setHasNewConversation(false);
    setNewConversationId(null);
  };

  // Start a conversation with socket
  const startConversation = async (senderId, receiverId, itemId) => {
    if (!socket) {
      toast.dismiss();
      toast.error('Socket ist nicht verbunden!');
      return;
    }

    try {
      socket.emit('createConversation', { senderId, receiverId, itemId }, (response) => {
        if (response.error) {
          toast.error(response.error);
          return;
        }
        setConversationId(response._id);
        setConversations((prev) => [response, ...prev]);
        setNewConversationId(response._id);
        setTimeout(getConversations, 500);
      });
    } catch (error) {
      console.error('Error in startConversation:', error);
      reject(error);
    }
  };

  // const startConversation = (senderId, receiverId, itemId) => {
  //     return new Promise((resolve, reject) => {
  //         if (!socket) {
  //             toast.error("Socket is not connected!");
  //             return reject("Socket is not connected!");
  //         }

  //         try {
  //             socket.emit("createConversation", { senderId, receiverId, itemId }, (response) => {
  //                 if (response.error) {
  //                     toast.error(response.error);
  //                     return reject(response.error);
  //                 }
  //                 setConversationId(response._id);
  //                 setConversations((prev) => [response, ...prev]);
  //                 setNewConversationId(response._id);
  //                 setTimeout(getConversations, 500);
  //                 resolve(response);  // ✅ Return the conversation object
  //             });
  //         } catch (error) {
  //             console.error("Error in startConversation:", error);
  //             reject(error);
  //         }
  //     });
  // };

  // Fetch Messages
  const getMessages = async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      const res = await fetch(`${url}/api/messages/${conversationId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  //state für benachrichtigungen
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    if (conversationId) {
      getMessages();
    } else {
      setMessages([]);
    }
  }, [conversationId, user]);

  // Listen for Real-Time Messages
  useEffect(() => {
    if (socket) {
      socket.on('privateMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setHasNewMessage(true);
      });
      socket.on('connect', getMessages);
      return () => {
        socket.off('privateMessage');
        socket.off('connect');
      };
    }
  }, [socket]);

  const resetNewMessageNotification = () => {
    setHasNewMessage(false);
  };

  // Send Message via Socket
  const sendMessage = async ({ senderId, receiverId, message }) => {
    if (!socket) {
      console.error('Socket is not connected!');
      return;
    }

    const newMessage = { senderId, receiverId, message, conversationId };

    socket.emit('privateMessage', newMessage, (savedMessage) => {
      if (!savedMessage) {
        toast.error('Nachricht konnte nicht gesendet werden.');
        return;
      }
      setMessages((prevMessages) => [...prevMessages, savedMessage]);
    });
  };

  return (
    <ChatContext.Provider
      value={{
        getConversations,
        conversations,
        conversationId,
        setConversationId,
        startConversation,
        messages,
        sendMessage,
        getMessages,
        loadingConversations,
        handleLogout,
        hasNewMessage,
        resetNewMessageNotification,
        hasNewConversation,
        resetNewConversationNotification,
        newConversationId
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

//with localStorage
// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useAuth } from "../hooks/useAuth";
// import { io } from "socket.io-client";
// import { AuthContext } from '../context/AuthContext';
// export const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//     const url = import.meta.env.VITE_API_URL;
//     //const { user, loadingUser } = useAuth();
//     const { user } = useContext(AuthContext)
//     // Socket State
//     const [socket, setSocket] = useState(null);

//     // Messages & Conversations
//     const [conversationId, setConversationId] = useState(() =>
//         localStorage.getItem("conversationId") || null
//     );
//     const [messages, setMessages] = useState([]);
//     const [conversations, setConversations] = useState([]);
//     const [loadingConversations, setLoadingConversations] = useState(true);

//     // Save conversationId in localStorage
//     useEffect(() => {
//         if (conversationId) {
//             localStorage.setItem("conversationId", conversationId);
//         } else {
//             localStorage.removeItem("conversationId");
//         }
//     }, [conversationId]);

//     // Handle User Logout
//     const handleLogout = () => {
//         if (socket) {
//             socket.disconnect();
//         }
//         logout(); // Clear user data
//     };

//     // Initialize Socket Connection
//     useEffect(() => {
//         if (user) {
//             const newSocket = io(url, { withCredentials: true });
//             setSocket(newSocket);

//             newSocket.emit("registerUser", user._id); // Send user ID to backend

//             newSocket.on("connect", () => console.log("Connected to Socket.io"));
//             newSocket.on("disconnect", () => console.log("Disconnected from Socket.io"));

//             return () => newSocket.disconnect(); // Cleanup on unmount
//         }
//     }, [user]);

//     // Fetch Conversations
//     const getConversations = async () => {
//         if (!user) return;
//         setLoadingConversations(true);

//         try {
//             const res = await fetch(`${url}/api/inbox/${user._id}`, {
//                 method: "GET",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (!res.ok) throw new Error("Failed to get conversations");

//             const data = await res.json();
//             // setConversations(data.currentUserChats);
//             setConversations([...data.currentUserChats]); // Ensure new array reference
//         } catch (error) {

//             console.error("Error fetching conversations:", error);
//         } finally {
//             setLoadingConversations(false);
//         }
//     };

//     useEffect(() => {
//         if (user) {
//             getConversations();
//         }
//     }, [user, conversationId]);

//     useEffect(() => {
//         if (socket) {
//             socket.on("newConversation", (newConversation) => {
//                 console.log("Received newConversation:", newConversation);
//                 setConversations((prev) => [newConversation, ...prev]);
//             });

//             return () => {
//                 socket.off("newConversation");
//             };
//         }
//     }, [socket]);

//     // Start a conversation with socket
//     const startConversation = async (senderId, receiverId, itemId) => {
//         if (!socket) {
//             toast.error("Socket is not connected!");
//             return;
//         }

//         try {
//             // Use a callback function directly inside socket.emit
//             socket.emit("createConversation", { senderId, receiverId, itemId }, async (response) => {
//                 if (response.error) {
//                     toast.error(response.error);
//                     return;
//                 }

//                 console.log("New conversation created:", response);

//                 // Update the conversation state immediately
//                 setConversationId(response._id);
//                 setConversations((prev) => [response, ...prev]);

//                 //  Fetch updated conversations
//                 setTimeout(() => {
//                     getConversations();
//                 }, 500);
//             });

//         } catch (error) {
//             // toast.error(error || "Failed to start conversation");
//             console.error("Error in startConversation:", error);
//         }
//     };

//     // Start a conversation without socket
//     // const startConversation = async (senderId, receiverId, itemId) => {
//     //     try {
//     //         const res = await fetch(`${url}/api/inbox/start/${receiverId}`, {
//     //             method: "POST",
//     //             credentials: "include",
//     //             headers: { "Content-Type": "application/json" },
//     //             body: JSON.stringify({ senderId, itemId }),
//     //         });

//     //         if (!res.ok) throw new Error("Failed to start or fetch conversation");

//     //         const data = await res.json();
//     //         const newConversationId = data.conversationId;

//     //         setConversationId(newConversationId);
//     //         return newConversationId;
//     //     } catch (error) {
//     //         toast.error("Failed to start conversation");
//     //         console.error("Error starting conversation:", error);
//     //     }
//     // };

//     // Fetch Messages
//     const getMessages = async () => {
//         if (!conversationId) {
//             console.log('no conversation found');
//             setMessages([])
//             return
//         }

//         try {
//             console.log("Fetching messages for conversationId:", conversationId);
//             const res = await fetch(`${url}/api/messages/${conversationId}`, {
//                 method: "GET",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (!res.ok) throw new Error("Failed to fetch messages");

//             const data = await res.json();
//             setMessages(data);
//         } catch (error) {

//             console.error("Error fetching messages:", error);
//         }
//     };

//     useEffect(() => {
//         if (conversationId) {
//             getMessages();
//         } else {
//             setMessages([]);
//         }
//     }, [conversationId, user]);

//     // Listen for Real-Time Messages
//     useEffect(() => {
//         if (socket) {
//             socket.on("privateMessage", (newMessage) => {
//                 console.log("Received message:", newMessage);
//                 // setMessages((prevMessages) => [...prevMessages, newMessage]);
//                 setTimeout(() => {
//                     setMessages((prevMessages) => [...prevMessages, newMessage]);
//                 }, 500); // Small delay
//             });

//             socket.on("connect", () => {
//                 console.log("Reconnected! Fetching latest messages...");
//                 getMessages();
//             });

//             return () => {
//                 socket.off("privateMessage");
//                 socket.off("connect");
//             };
//         }
//     }, [socket]);

//     // Send Message via Socket
//     const sendMessage = async ({ senderId, receiverId, message }) => {
//         if (!socket) {
//             console.error("Socket is not connected!");
//             return;
//         }

//         const newMessage = { senderId, receiverId, message, conversationId };

//         socket.emit("privateMessage", newMessage, (savedMessage) => {
//             if (!savedMessage) {
//                 console.error("Error: Message not saved!");
//                 toast.error("Message failed to send.");
//                 return;
//             }

//             // Update UI with the saved message
//             setMessages((prevMessages) => [...prevMessages, savedMessage]);
//             console.log("Message saved:", savedMessage);
//         });
//     };

//     return (
//         <ChatContext.Provider
//             value={{
//                 getConversations,
//                 conversations,
//                 conversationId,
//                 setConversationId,
//                 startConversation,
//                 messages,
//                 sendMessage,
//                 getMessages,
//                 loadingConversations,
//                 handleLogout
//             }}
//         >
//             {children}
//         </ChatContext.Provider>
//     );
// };

// export const useChat = () => useContext(ChatContext);

// // works but only on refresh and some errors
// // import { createContext, useContext, useState, useEffect, use } from "react";
// // import { toast } from "react-toastify";
// // import { useAuth } from "../hooks/useAuth";
// // import { io } from 'socket.io-client'

// // export const ChatContext = createContext();

// // export const ChatProvider = ({ children }) => {
// //     const url = import.meta.env.VITE_URL;
// //     const { user, loadingUser } = useAuth()
// //     // socket hier
// //     const [socket, setSocket] = useState(null);

// //     //conversationId state
// //     const [conversationId, setConversationId] = useState(() =>
// //         localStorage.getItem("conversationId") || null
// //     );
// //     // const [conversationId, setConversationId] = useState(null)
// //     useEffect(() => {
// //         if (conversationId) {
// //             localStorage.setItem("conversationId", conversationId);
// //         }
// //         else if (!user) {
// //             setConversationId(null)
// //         } else {
// //             localStorage.removeItem("conversationId");
// //         }
// //     }, [conversationId]);

// //     useEffect(() => {
// //         if (!user) {
// //             setConversationId(null);
// //             localStorage.removeItem("conversationId");
// //         }
// //     }, [user]);

// //     useEffect(() => {
// //         if (user) {
// //             const newSocket = io(url, { withCredentials: true });
// //             setSocket(newSocket);

// //             newSocket.emit("registerUser", user._id); // Send user ID to server

// //             newSocket.on("connect", () => console.log("Connected to Socket.io"));
// //             newSocket.on("disconnect", () => console.log("Disconnected from Socket.io"));

// //             return () => newSocket.disconnect(); // Cleanup on unmount
// //         }
// //     }, [user]);

// //     const handleLogout = () => {
// //         if (socket) {
// //             socket.disconnect();
// //         }
// //         logout(); // Clear user data
// //     };

// //     // get Conversations for logged in user
// //     const [conversations, setConversations] = useState([]);
// //     const [loadingConversations, setLoadingConversations] = useState(true);
// //     const getConversations = async () => {
// //         if (!user) return
// //         // if (!user?._id) return;

// //         setLoadingConversations(true)
// //         const userId = user._id
// //         try {
// //             const res = await fetch(`${url}/api/inbox/${userId}`, {
// //                 method: "GET",
// //                 credentials: "include",
// //                 headers: { "Content-Type": "application/json" },

// //             })
// //             if (!res.ok) throw new Error("Failed to get conversations");
// //             const data = await res.json()
// //             console.log('getConversations ChatContext data:', data)
// //             setConversations(data.currentUserChats)

// //         } catch (error) {
// //             toast.error("Failed to get conversations");
// //             console.error("Error fetching conversations getConversations in ChatContext:", error);
// //         } finally {
// //             setLoadingConversations(false);
// //         }

// //     }
// //     useEffect(() => {
// //         if (user) {
// //             getConversations();
// //         }
// //     }, [user]);

// //     // start conversation
// //     const startConversation = async (senderId, receiverId, itemId) => {
// //         try {
// //             const res = await fetch(`${url}/api/inbox/start/${receiverId}`, {
// //                 method: "POST",
// //                 credentials: "include",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify({ senderId, itemId }),
// //             });

// //             if (!res.ok) throw new Error("Failed to start or fetch conversation");

// //             const data = await res.json();
// //             const newConversationId = data.conversationId;

// //             setConversationId(newConversationId);
// //             return newConversationId;
// //         } catch (error) {
// //             toast.error("Failed to start conversation");
// //             console.error("Error starting conversation:", error);
// //         }
// //     };

// //     // get messages from conversationId
// //     const [messages, setMessages] = useState([]);
// //     const getMessages = async () => {
// //         if (!conversationId) {
// //             console.warn("No conversationId found! Messages won't load.");
// //             return;
// //         }

// //         try {
// //             console.log("Fetching messages for conversationId:", conversationId);
// //             const res = await fetch(`${url}/api/messages/${conversationId}`, {
// //                 method: "GET",
// //                 credentials: "include",
// //                 headers: { "Content-Type": "application/json" }
// //             });

// //             if (!res.ok) throw new Error("Failed to fetch messages");

// //             const responseData = await res.json();

// //             console.log("responseData in getMessages:", responseData);
// //             setMessages(responseData);

// //         } catch (error) {
// //             toast.error(error.message);
// //         }
// //     };

// //     useEffect(() => {
// //         console.log("useEffect triggered in chatContext getMessages. conversationId:", conversationId);
// //         if (!conversationId) {
// //             setMessages([])
// //             console.warn("No conversationId found! Messages won't load.");
// //             return;
// //         }

// //         getMessages();
// //     }, [conversationId]);

// //     useEffect(() => {
// //         if (socket) {
// //             socket.on("privateMessage", (newMessage) => {
// //                 console.log("Received message via Socket.io:", newMessage);
// //                 setMessages((prevMessages) => [...prevMessages, newMessage]);
// //             });
// //             socket.on("connect", () => {
// //                 console.log("Reconnected! Fetching latest messages...");
// //                 getMessages();
// //             });
// //         }
// //     }, [socket]);

// //     // send Messages
// //     const sendMessage = async ({ senderId, receiverId, message }) => {
// //         if (!socket) {
// //             console.error("Socket is not connected!");
// //             return;
// //         }

// //         try {
// //             const newMessage = {
// //                 senderId,
// //                 receiverId,
// //                 message,
// //                 conversationId,
// //             };

// //             // 🔹 Emit message and wait for confirmation from the backend
// //             socket.emit("privateMessage", newMessage, (error, savedMessage) => {
// //                 if (error) {
// //                     console.error("Error sending message via Socket.io:", error);
// //                     toast.error("Failed to send message");
// //                     return;
// //                 }

// //                 //  update UI with the saved message from DB
// //                 socket.on("messageSaved", (savedMessage) => {
// //                     setMessages((prevMessages) => [...prevMessages, savedMessage]);
// //                     console.log("Message confirmed & saved:", savedMessage);
// //                 });

// //                 socket.on("messageError", (error) => {
// //                     toast.error(error.error);
// //                 });
// //             });

// //         } catch (error) {
// //             console.error("Unexpected error in sendMessage:", error);
// //             toast.error("Something went wrong while sending the message");
// //         }
// //     };

// //     return (
// //         <ChatContext.Provider value={{
// //             getConversations,
// //             conversations,
// //             conversationId,
// //             setConversationId,
// //             startConversation,
// //             messages,
// //             sendMessage,
// //             getMessages,
// //             loadingConversations,
// //             handleLogout
// //         }}>
// //             {children}
// //         </ChatContext.Provider>
// //     );
// // };

// // export const useChat = () => useContext(ChatContext);
