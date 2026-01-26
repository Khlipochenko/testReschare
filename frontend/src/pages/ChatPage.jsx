import { ChatStartButton } from '../components/chat/ChatStartButton';
import LoginForm from '../components/chat/LogInChat';
import { ConversationList } from '../components/chat/ConversationList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { useEffect } from 'react';

export const ChatPage = ({ receiverId }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);

  return (
    <>

      <div className="flex justify-center items-center min-h-screen px-2 pt-36 overflow-hidden">
        <div className="flex w-full max-w-5xl rounded-lg shadow-lg h-[550px] gap-1 ">
          <div className="w-[100px] sm:w-1/3 md:w-96 flex flex-col items-center transition-all duration-300">
            <ConversationList />
          </div>

          <div className="flex-1 sm:w-2/3 md:w-96 flex flex-col justify-between transition-all duration-300 ">
            <ChatWindow />
          </div>
        </div>
      </div>



    </>
  );
};
