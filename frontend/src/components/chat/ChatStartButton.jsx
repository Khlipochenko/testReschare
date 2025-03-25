import { useGetItemForChat } from "../../hooks/useGetItemForChat";
import { useNavigate } from "react-router-dom";

// import { useAuth } from '../../hooks/useAuth'
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useChat } from "../../context/ChatContext";
import { useContext } from "react";


export const ChatStartButton = ({ itemId }) => {
    const { item, loading } = useGetItemForChat(itemId)

    const { startConversation, conversations, setConversationId } = useChat()
    // const { user } = useAuth()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();



    if (loading) return <p>Loading...</p>;
    if (!item) return <p>No item found</p>;

    const receiverId = item.userId;


    const handleStartChat = async () => {
        if (!user) {
            toast.dismiss();
            toast.error("Bitte logge dich ein, um einen Chat zu starten.");
            return;
        }
        const senderId = user._id
        const conversation = conversations.find((conv) =>
            conv.participants.some((p) => p._id === receiverId) &&
            conv.participants.some((p) => p._id === senderId)
        );
        let conversationId;

        if (conversation) {
            conversationId = conversation._id;
            setConversationId(conversationId);

        } else {
            const newConversation = await startConversation(senderId, receiverId, itemId);
            conversationId = newConversation?._id;
        }
        if (conversationId) {
            navigate(`/chat?conversationId=${conversationId}&receiverId=${receiverId}`);
            console.log(`Navigating to: /chat?conversationId=${conversationId}&receiverId=${receiverId}`);
        } else {
            navigate(`/chat?receiverId=${receiverId}`);
        }
    };


    // const handleStartChat = async () => {
    //     try {
    //         const senderId = user._id;
    //         const newConversationId = await startConversation(senderId, receiverId, item._id);  // hier item._id
    //         if (!newConversationId) return;
    //         console.log("Sender ID:", user._id);
    //         console.log("Receiver ID:", receiverId);
    //         console.log('item Id in chat start: ', itemId)




    //         navigate(`/chat?conversationId=${newConversationId}&receiverId=${receiverId}`);

    //         // navigate(`/chat?receiverId=${receiverId}`);

    //     } catch (error) {
    //         toast.error('login failed')
    //         console.error("Error starting chat:", error);
    //     }
    // };

    return (
        <button onClick={handleStartChat} className="mt-4 px-4 py-2 bg-custom-text-brown text-white rounded-md inline-block sm:hover:bg-custom-text-grey tracking-wider">
          Anfragen
        </button>
    );
};


//<ChatStartButton itemId={item._id} />
// item._id muss in dem component drin sein. wahrscheinlich wird es sein weil da die bilder und alles angezeigt wird