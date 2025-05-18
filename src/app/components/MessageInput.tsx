"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState, type ChangeEvent } from "react";

interface MessageInputProps {
  onClickToSend: (message: string) => void;
}

export default function MessageInput({ onClickToSend }: MessageInputProps) {
  const [message, setMessage] = useState<string | null>(null);

  function handleClickSend() {
    if (!message) {
      return;
    }
    onClickToSend(message);
  }
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setMessage(value);
  }
  return (
    <div className="flex items-center p-3 bg-gray-800 border-t border-gray-600">
      <input
        type="text"
        onChange={handleChangeInput}
        value={message || ""}
        placeholder="Digite uma mensagem"
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3"
      />
      <button
        onClick={handleClickSend}
        className="text-gray-400 hover:text-gray-200 transition-all p-2"
        aria-label="Enviar mensagem"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
