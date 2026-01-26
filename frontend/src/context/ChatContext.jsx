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

