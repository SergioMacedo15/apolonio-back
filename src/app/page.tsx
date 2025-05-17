import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/HeaderSidebar";
import SearchInput from "@/app/components/SearchInput";
import ConversationList from "@/app/components/ConversationList";
import HeaderChat from "@/app/components/HeaderChat";

export default function Home() {
  return (
    <div className="w-full h-full flex">
      <aside className="w-[5%] border-r border-gray-600 bg-gray-900 text-white">
        <Sidebar />
      </aside>
      <aside className="w-[28%] border-r border-gray-600 bg-gray-900 text-white">
        <Header />
        <SearchInput />
        <ConversationList />
      </aside>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-600 bg-gray-800 h-[10%] text-white">
          <HeaderChat />
        </div>

        {/* Componente Chat (Mensagens da Conversa) */}
        <div className="flex-1 bg-gray-700">
          {/* Mensagens da Conversa */}
        </div>

        <div className="border-b border-gray-600 bg-gray-800 h-[10%] text-white">
          {/* Input da Conversa */}
        </div>
      </div>
    </div>
  );
}