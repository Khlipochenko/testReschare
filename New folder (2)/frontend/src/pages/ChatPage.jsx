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
      {/* <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full gap-1">
          
            <div className="w-[550px] md:w-96 h-1/2 md:h-[550px] overflow-auto">
                <ConversationList />
            </div>

           
            <div className="w-[550px] md:w-96 h-[550px]">
                <ChatWindow />
            </div>
        </div> */}

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

      <div>
        {/* <LoginForm className="flex mx-auto" />
            <ChatStartButton itemId={'67c3950995175db456d73729'} /> */}
        {/* hier item id dynamisch aus dem komponent */}
      </div>
      {/* <div className="animate-spin h-6 w-6 border-t-2 border-gray-500 rounded-full"></div> */}
    </>
  );
};
