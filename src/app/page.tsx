"use client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/HeaderSidebar";
import ConversationList from "@/app/components/ConversationList";
import HeaderChat from "@/app/components/HeaderChat";
import Chat from "@/app/components/Chat";
import { useChat } from "@ai-sdk/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleSendMessage = () => {};
  return (
    <div className="w-full h-full flex">
      <aside className="w-[5%] border-r border-gray-600 bg-gray-900 text-white">
        <Sidebar />
      </aside>
      <aside className="w-[28%] border-r border-gray-600 bg-gray-900 text-white">
        <Header />
        <ConversationList />
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-600 bg-gray-800 h-[9.5%] text-white">
          <HeaderChat />
        </div>

        <div className="flex-1">
          <Chat onSend={handleSendMessage} messages={messages} />
        </div>
      </div>
    </div>
  );
}
