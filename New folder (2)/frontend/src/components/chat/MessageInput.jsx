import { useState, useContext } from "react";
import { FiSend } from "react-icons/fi";
// import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../context/ChatContext";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
export const MessageInput = ({ receiverId }) => {
    const [message, setMessage] = useState("");
    const { sendMessage, conversationId, startConversation } = useChat();
    // const { user } = useAuth();
    const { user } = useContext(AuthContext)
    if (!user) return <p>Login to send a message</p>;

    const senderId = user._id;

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() === "") return;

        try {
            if (!conversationId) {
                const newConversationId = await startConversation(senderId, receiverId, itemId);
                if (!newConversationId) return;
                await sendMessage({ senderId, receiverId, conversationId: newConversationId, message });
                toast.success("Conversation started and message sent!");
            } else {
                await sendMessage({ senderId, receiverId, conversationId, message });
            }

            setMessage("");
        } catch (error) {
            toast.dismiss()
            toast.error("Fehler beim Senden der Nachricht.");
        }
    };

    return (
        // <div className="absolute bottom-0 left-0 w-full h-24">
        <div className="w-full absolute bottom-0   h-1/6">
            <form className="flex items-center justify-center h-full gap-3 mt-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..."
                    className="w-3/4 h-8 rounded-md"
                />
                <button onClick={handleSendMessage}>
                    <FiSend size={30} />
                </button>
            </form>
        </div>

    );

};















// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { FiSend } from "react-icons/fi";
// import { useAuth } from "../../hooks/useAuth";
// import { useChat } from "../../context/ChatContext";
// import { toast } from "react-toastify";


// export const MessageInput = () => {
//     const [message, setMessage] = useState("");
//     const { sendMessage, conversationId, startConversation } = useChat();

//     const { user } = useAuth();
//     const [searchParams] = useSearchParams();

//     if (!user) return <p>Login to send a message</p>;

//     const senderId = user._id;
//     const receiverId = searchParams.get("receiverId");

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (message.trim() === "") return;

//         try {
//             if (!conversationId) {

//                 const newConversationId = await startConversation(senderId, receiverId)
//                 if (!newConversationId) {
//                     return;
//                 }


//                 await sendMessage({ senderId, receiverId, conversationId: newConversationId, message });
//                 toast.success("Conversation started and message sent!");


//             }
//             else {
//                 await sendMessage({ senderId, receiverId, conversationId, message });

//             }





//             setMessage("");
//         } catch (error) {
//             toast.error('error starting conversation')
//         }
//     };

//     return (
//         <div className="absolute bottom-0 left-0 w-full h-24">
//             <form className="flex items-center justify-center h-full gap-3 mt-2  ">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Write a message..."
//                     className="w-3/4 h-8 rounded-md"
//                 />
//                 <button onClick={handleSendMessage}>
//                     <FiSend size={30} />
//                 </button>
//             </form>
//         </div>
//     );
// };