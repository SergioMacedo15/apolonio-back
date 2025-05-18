"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookmarkIcon } from "@heroicons/react/24/solid";

interface GrandmaConversationItemProps {
  profileImage: string;
  name: string;
  lastMessage: string;
  time: string;
}

export default function GrandmaConversationItem({
  profileImage,
  name,
  lastMessage,
  time,
}: GrandmaConversationItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/chat/vo");
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center p-3 gap-3 hover:bg-gray-700 cursor-pointer transition-colors bg-gray-800"
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
          <p className="text-gray-400 text-sm truncate">{lastMessage}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-green-500 font-medium">{time}</span>
          <BookmarkIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="w-[75%] mr-4 ml-auto border-t border-gray-600" />
    </>
  );
}
