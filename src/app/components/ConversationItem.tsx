"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { PaperClipIcon } from "@heroicons/react/24/outline";

interface ConversationItemProps {
  profileImage: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

export default function ConversationItem({
  profileImage,
  name,
  lastMessage,
  time,
  unreadCount = 0
}: ConversationItemProps) {
  const [isShaking, setIsShaking] = useState(false);
  const isShakingRef = useRef(false);

  const handleClick = () => {
    if (isShakingRef.current) return;
    
    setIsShaking(true);
    isShakingRef.current = true;
    
    toast.error(`Foco na missão, soldado!`, {
      position: "top-right",
      autoClose: 1700,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    
    setTimeout(() => {
      setIsShaking(false);
      isShakingRef.current = false;
    }, 650);
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className={`flex items-center p-3 gap-3 hover:bg-gray-700 cursor-pointer transition-colors ${isShaking ? "animate-shake" : ""}`}
      >
        <Image 
          src={profileImage} 
          alt={name} 
          width={48} 
          height={48} 
          className="rounded-full object-cover" 
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">{name}</span>
          </div>
          <p className={`${unreadCount >= 2 ? "text-green-500 font-bold" : "text-gray-400"} text-sm truncate`}>
            {lastMessage}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className={`text-xs ${unreadCount > 0 ? "text-green-500 font-medium" : "text-gray-400"}`}>
            {time}
          </span>
          {unreadCount ? (
            <div className="bg-green-500 text-white text-xs font-semibold flex items-center justify-center w-5 h-5 rounded-full">
              {unreadCount}
            </div>
          ) : (
            <div className="flex items-center justify-center w-5 h-5">
              <PaperClipIcon className="w-4 h-4 text-gray-500" />
            </div>
          )}
        </div>
      </div>
      <div className="w-[75%] mr-4 ml-auto border-t border-gray-600" />
    </>
  );
}