"use client";
import { PaperAirplaneIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { type ChangeEvent, useState, useEffect } from "react";
import WinOverlay from "@/app/components/WinOverlay";

interface MessageInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  input: string;
}

export default function MessageInput({ input, onChange, onSend }: MessageInputProps) {
  const [showWin, setShowWin] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      onSend();
    }
  };

  const handleWinClick = () => {
    setShowWin(true);
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
        <button onClick={handleWinClick} className="text-green-400 hover:text-green-200 transition-all p-2 cursor-pointer" aria-label="Win Game">
          <TrophyIcon className="h-5 w-5" />
        </button>
      </div>

      <WinOverlay show={showWin} width={dimensions.width} height={dimensions.height} />
    </>
  );
}
