import { useEffect, useRef, useContext } from 'react';

import { useChat } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
export const MessageList = () => {
  const lastMessage = useRef(null);
  // const { user, loadingUser } = useAuth();
  const { user, loadingUser } = useContext(AuthContext);
  const { messages, getMessages, conversationId } = useChat();

  const location = useLocation();
  useEffect(() => {
    if (conversationId) {
      getMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    const scrollToLastMessage = () => {
      lastMessage.current?.scrollIntoView({ behavior: 'smooth' });
    };

    setTimeout(scrollToLastMessage, 100);
  }, [messages, conversationId]);

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;
  if (loadingUser) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center  bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
      </div>
    );
  }
  if (!conversationId) {
    return <p className="text-center text-gray-500">Select a conversation</p>;
  }
  return (
    <div className="overflow-auto pb-2 h-3/4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      <div className="p-2 space-y-2 flex flex-col  ">
        {messages?.length > 0 ? (
          messages.map((msg, index) => {
            const fromMe = msg.senderId === user._id;
            return (
              <div
                key={msg._id || `msg-${index}`}
                ref={lastMessage}
                className={`p-3 rounded-lg text-white flex flex-col break-words  
                                    ${
                                      fromMe
                                        ? 'bg-custom-text-grey self-end rounded-br-none'
                                        : 'bg-custom-text-green self-start rounded-bl-none'
                                    } 
                                    w-full sm:w-fit max-w-xs`}
              >
                <p className="text-white">{msg.message}</p>
                <span className="text-xs text-gray-400 self-end">{new Date(msg.createdAt).toLocaleTimeString()}</span>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">Start a conversation!</p>
        )}
      </div>
    </div>
  );
};

// import { useEffect, useRef } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { useChat } from "../../context/ChatContext";

// export const MessageList = () => {
//     const lastMessage = useRef(null);
//     const { user } = useAuth();
//     const { messages, getMessages, conversationId } = useChat();

//     console.log("ChatContext:", useChat());
//     useEffect(() => {
//         if (conversationId) {
//             getMessages();
//         }
//     }, [conversationId]);

//     useEffect(() => {
//         lastMessage.current?.scrollIntoView({ behavior: "auto" });
//     }, [messages]);
//     if (!user) return <p className="text-center text-gray-500">Loading...</p>;
//     return (
//         <div className="overflow-auto pb-24 h-[410px] border border-red-700">
//             <h2>Message List</h2>
//             <div className="p-4 space-y-2 flex flex-col">
//                 {messages?.length > 0 ? (
//                     messages.map((msg) => {
//                         const fromMe = msg.senderId === user._id;
//                         return (

//                             <div
//                                 key={msg._id}
//                                 ref={lastMessage}
//                                 className={`p-3 rounded-lg text-white flex flex-col break-words w-fit max-w-[75%] sm:max-w-xs
//                                 ${fromMe ? "bg-custom-text-grey self-end rounded-br-none" : "bg-custom-text-green self-start rounded-bl-none"}`}
//                             >
//                                 <p className="text-white">{msg.message}</p>
//                                 <span className="text-xs text-gray-400 self-end">
//                                     {new Date(msg.createdAt).toLocaleTimeString()}
//                                 </span>
//                             </div>

//                         );
//                     })
//                 ) : (
//                     <p className="text-center text-gray-500">Start a conversation!</p>
//                 )}
//             </div>
//         </div>
//     );
// };
