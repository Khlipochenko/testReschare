import { useSearchParams } from "react-router-dom";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useChat } from "../../context/ChatContext";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export const ChatWindow = () => {
    const { conversations, conversationId, } = useChat();
    //const { user, loadingUser } = useAuth();
    const { user, loadingUser } = useContext(AuthContext)
    const [searchParams] = useSearchParams();
    const receiverId = searchParams.get("receiverId");
    const conversationIdUrl = searchParams.get('conversationId')
    const [receiver, setReceiver] = useState(null);

    useEffect(() => {
        if (!receiverId) return;

        // Find the receiver details from conversations
        const activeConversation = conversations.find(conv =>
            conv.participants.some(p => p._id === receiverId)
        );

        const receiverData = activeConversation?.participants.find(p => p._id !== user?._id);
        setReceiver(receiverData);
    }, [receiverId, conversations, user, conversationId]);
    // if (!conversationId) {
    //     return (
    //         <div className="my-10 w-96 border flex h-[550px] text-center flex-col pt-5 bg-custom-text-brown rounded-xl relative">
    //             <h2 className="font-bold text-lg">Select a conversation to start chatting</h2>
    //         </div>
    //     );
    // }
    if (loadingUser) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
            </div>
        );
    }

    return (
        // <div className="my-10 w-96 border flex h-[550px] text-center flex-col pt-5 bg-custom-text-brown rounded-xl relative">

        // <div className=" relative w-full h-full items-center bg-black/20 backdrop-blur-sm border border-white/20 p-6 rounded-xl shadow-xl">

        <div className=" relative w-full h-full items-center bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">

            <h2 className="font-bold text-lg text-center py-4 bg-opacity-25">
                {conversationIdUrl && receiver ? receiver.username : "Loading...select a chat"}
            </h2>
            {conversationIdUrl ? <MessageList /> : null}

            {conversationIdUrl ? <MessageInput receiverId={receiverId} /> : null}
        </div>
    );
};












// import { MessageInput } from "./MessageInput";
// import { MessageList } from "./MessageList";
// import { useChat } from "../../context/ChatContext";
// import { useAuth } from "../../hooks/useAuth";

// export const ChatWindow = () => {
//     const { conversationId, conversations } = useChat();
//     const { user } = useAuth();


//     // Find receiverId based on active conversation
//     const activeConversation = conversations.find((conv) => conv._id === conversationId);
//     const receiver = activeConversation?.participants.find((p) => p._id !== user._id);
//     const receiverId = receiver?._id;

//     return (<>
//         <div className=" my-10 w-96 border flex h-[550px] text-center flex-col pt-5 bg-custom-text-brown rounded-xl relative">
//             <h2></h2>
//             <MessageList />
//             <MessageInput receiverId={receiverId} />
//         </div>

//     </>);
// };












// import { ChatStartButton } from './ChatStartButton'
// import LoginForm from './LogInChat'
// import { MessageInput } from './MessageInput'
// import { MessageList } from './MessageList'
// import { ProductCardChat } from './ProductCardChat'
// import { ConversationList } from './ConversationList'
// export const ChatWindow = ({ receiverId }) => {

//     return (<>



//         <div className='mx-auto my-10 w-96 border flex  h-[550px] text-center flex-col pt-5 bg-custom-text-brown rounded-xl relative'>Chat Window
//             {/* hier kommt ein component mit den produktbild und user den man anschreiben will */}
//             <ProductCardChat />
//             <MessageList />
//             <MessageInput receiverId={receiverId} />

//         </div>

//         <div >
//             <LoginForm className="flex mx-auto" />
//             <ChatStartButton /></div>
//     </>

//     )
// }