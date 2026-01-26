import { useChat } from "../../context/ChatContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetItemForChat } from "../../hooks/useGetItemForChat";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const ConversationList = () => {
    const {
        conversations,
        setConversationId,
        loadingConversations,
        newConversationId,
        resetNewConversationNotification,
    } = useChat();

    const { user, loadingUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const urlConversationId = searchParams.get("conversationId");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const { item, loading: loadingItem } = useGetItemForChat(selectedItemId);

    // useEffect(() => {
    //     if (urlConversationId) {
    //         navigate("/chat", { replace: true }); // Removes query params without adding to history
    //     }
    // }, []);

    useEffect(() => {
        if (urlConversationId) {
            console.log("Keeping conversationId in URL:", urlConversationId);
        }
    }, [urlConversationId]);

    useEffect(() => {
        if (!urlConversationId || loadingConversations || loadingUser) return; // ⏳ Wait until data is loaded

        const foundConversation = conversations.find(conv => conv._id === urlConversationId);

        if (foundConversation) {
            const chatContact = foundConversation.participants.find(p => p._id !== user?._id);

            if (chatContact && user) {
                console.log("✅ Found conversation participants:", foundConversation);
                navigate(`/chat?conversationId=${foundConversation._id}&receiverId=${chatContact._id}`);
            }
        } else {
            console.warn("⚠️ No conversation found for conversationId:", urlConversationId);
        }
    }, [urlConversationId, conversations, loadingConversations, loadingUser, navigate, user]);

    const handleConversationClick = (conversationId) => {
        const conversation = conversations.find(conv => conv._id === conversationId);

        if (!conversation || !conversation.participants) {
            console.error("Invalid conversation data:", conversation);
            return;
        }

        const chatContact = conversation.participants.find(p => p._id !== user?._id);
        if (!chatContact) {
            console.error("No valid receiver found in conversation:", conversation);
            return;
        }

        setConversationId(conversationId);
        if (conversation.itemId) {
            setSelectedItemId(conversation.itemId);
        }

        // Reset new conversation highlight when clicked
        if (conversationId === newConversationId) {
            resetNewConversationNotification();
        }

        navigate(`/chat?conversationId=${conversationId}&receiverId=${chatContact._id}`);
    };

    if (!user) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm p-6 shadow-lg rounded-lg space-y-4">
                Log In to chat
            </div>
        );
    }

    if (loadingUser || loadingConversations) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full text-center h-[550px] bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg overflow-auto items-center">
            <h2>Conversation List</h2>
            {conversations.length > 0 ? (
                conversations.map((conversation) => {
                    const chatContact = conversation.participants.find((p) => p._id !== user._id);
                    const isNew = conversation._id === newConversationId;

                    return (
                        <div key={conversation._id}>
                            <div
                                className={`flex justify-between w-[350px] py-2 px-4 h-20 items-center mx-auto cursor-pointer 
                                    ${isNew ? "bg-red-500 text-white font-bold" : ""} 
                                    ${urlConversationId === conversation._id ? "bg-custom-text-grey bg-opacity-20" : "hover:bg-custom-bg-page bg-opacity-20"}`}
                                onClick={() => handleConversationClick(conversation._id)}
                            >
                                <div className="flex justify-between items-center w-4/5 gap-8">
                                    <p>{chatContact?.username || <span className="text-custom-highlight-cherryred">Neue Anfrage</span>}</p>

                                    {loadingItem && selectedItemId === conversation.itemId ? (
                                        <div className="loading-spinner">Loading...</div>
                                    ) : item && item._id === conversation.itemId ? (
                                        <>
                                            <p>{item.title}</p>
                                            <img className="w-16 border-2" src={item.images[0]} alt="item" />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                            <div className="divider my-0 py-0 h-1 bg-custom-text-grey bg-opacity-25 w-[350px]"></div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-500 py-4">No conversations found.</p>
            )}
        </div>
    );
};





//this works trying to highlight the new conversation for both receiver and sender
// import { useChat } from "../../context/ChatContext";

// import { useNavigate, useLocation } from "react-router-dom";
// import { useGetItemForChat } from "../../hooks/useGetItemForChat";
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// export const ConversationList = () => {
//     const {
//         conversations,
//         setConversationId,
//         loadingConversations,
//         hasNewConversation,
//         newConversationId,
//         resetNewConversationNotification } = useChat();
//     const { user, loadingUser } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);

//     const urlConversationId = searchParams.get("conversationId");
//     //const urlReceiverId = searchParams.get("receiverId");



//     const [selectedItemId, setSelectedItemId] = useState(null);
//     const { item, loading: loadingItem } = useGetItemForChat(selectedItemId);

//     useEffect(() => {
//         if (urlConversationId) {
//             navigate("/chat", { replace: true }); // Removes query params without adding to history
//         }
//     }, []);

//     useEffect(() => {
//         if (!urlConversationId || loadingConversations || loadingUser) return; // ⏳ Wait until data is loaded

//         const foundConversation = conversations.find(conv => conv._id === urlConversationId);

//         if (foundConversation) {
//             // Find the chat participant who is NOT the current user (this is the receiver)
//             const chatContact = foundConversation.participants.find(p => p._id !== user?._id);

//             if (chatContact) {
//                 console.log("✅ Found conversation participants:", foundConversation);
//                 navigate(`/chat?conversationId=${foundConversation._id}&receiverId=${chatContact._id}`);
//             }
//         } else {
//             console.warn("⚠️ No conversation found for conversationId:", urlConversationId);
//         }
//     }, [urlConversationId, conversations, loadingConversations, loadingUser, navigate, user]);




//     const handleConversationClick = (conversationId) => {
//         const conversation = conversations.find(conv => conv._id === conversationId);

//         if (!conversation || !conversation.participants) {
//             console.error("Invalid conversation data:", conversation);
//             return;
//         }

//         const chatContact = conversation.participants.find(p => p._id !== user?._id);
//         if (!chatContact) {
//             console.error("No valid receiver found in conversation:", conversation);
//             return;
//         }

//         setConversationId(conversationId);
//         if (conversation.itemId) {
//             setSelectedItemId(conversation.itemId);
//         }

//         navigate(`/chat?conversationId=${conversationId}&receiverId=${chatContact._id}`);
//     };

//     if (!user) {
//         return <div className="w-full h-full flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm p-6 shadow-lg rounded-lg space-y-4">
//             Log In to chat
//         </div>;
//     }

//     if (loadingUser || loadingConversations) {
//         return (
//             <div className="w-full h-full flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg space-y-4">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full text-center h-full bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg overflow-auto items-center">
//             <h2>Conversation List</h2>
//             {conversations.length > 0 ? (
//                 conversations.map((conversation) => {
//                     const chatContact = conversation.participants.find((p) => p._id !== user._id);

//                     return (
//                         <div key={conversation._id}>
//                             <div
//                                 className={`flex justify-between w-[350px] py-2 px-4 h-20 items-center mx-auto cursor-pointer 
//                                 ${urlConversationId === conversation._id ? "bg-custom-text-grey bg-opacity-20" : "hover:bg-custom-bg-page bg-opacity-20"}`}
//                                 onClick={() => handleConversationClick(conversation._id)}
//                             >
//                                 <div className="flex justify-between items-center w-4/5 gap-8">
//                                     <p>{chatContact?.username || <span className="text-custom-highlight-cherryred">Neue Anfrage</span>}</p>

//                                     {loadingItem && selectedItemId === conversation.itemId ? (
//                                         <div className="loading-spinner">Loading...</div>
//                                     ) : item && item._id === conversation.itemId ? (
//                                         <>
//                                             <p>{item.title}</p>
//                                             <img className="w-16 border-2" src={item.images[0]} alt="item" />
//                                         </>
//                                     ) : null}
//                                 </div>
//                             </div>
//                             <div className="divider my-0 py-0 h-1 bg-custom-text-grey bg-opacity-25 w-[350px]"></div>
//                         </div>
//                     );
//                 })
//             ) : (
//                 <p className="text-center text-gray-500 py-4">No conversations found.</p>
//             )}
//         </div>
//     );
// };
