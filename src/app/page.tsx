export default function Home() {
  return (
    <div className="w-full h-full flex">
      {/* Sidebar */}
      <aside className="w-[5%] border-r border-gray-600 bg-gray-900 text-white">
        {/* Componente Sidebar */}
      </aside>
      <aside className="w-[28%] border-r border-gray-600 bg-gray-900 text-white">
        {/* Componente Sidebar */}
      </aside>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col">
        {/* Componente Chats (Listagem de conversas) */}
        <div className="border-b border-gray-600 bg-gray-800 h-[10%] text-white">
          {/* Header da Conversa */}
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