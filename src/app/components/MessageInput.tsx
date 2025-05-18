"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { type ChangeEvent } from "react";

interface MessageInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  input: string;
}

export default function MessageInput({ input, onChange, onSend }: MessageInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      onSend();
    }
  };


  return (
    <>
      <div className="flex items-center p-3 bg-gray-800 border-t border-gray-600">
        <input
          type="text"
          onChange={onChange}
          onKeyDown={handleKeyPress}
          value={input}
          placeholder="Digite uma mensagem"
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3"
        />
        <button onClick={onSend} className="text-gray-400 hover:text-gray-200 transition-all p-2 cursor-pointer" aria-label="Enviar mensagem">
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
