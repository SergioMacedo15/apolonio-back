import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function MessageInput() {
  return (
    <div className="flex items-center p-3 bg-gray-800 border-t border-gray-600">
      <input
        type="text"
        placeholder="Digite uma mensagem"
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3"
      />
      <button
        className="text-gray-400 hover:text-gray-200 transition-all p-2"
        aria-label="Enviar mensagem"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
