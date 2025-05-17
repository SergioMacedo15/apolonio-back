import Image from "next/image";

interface ConversationItemProps {
  profileImage: string;
  name: string;
  lastMessage: string;
  time: string;
}

export default function ConversationItem({
  profileImage,
  name,
  lastMessage,
  time,
}: ConversationItemProps) {
  return (
    <div className="flex items-center p-3 gap-3 hover:bg-gray-700 cursor-pointer transition-colors">
      <Image
        src={profileImage}
        alt={name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">{name}</span>
          <span className="text-sm text-gray-400">{time}</span>
        </div>
        <p className="text-gray-400 text-sm truncate">{lastMessage}</p>
      </div>
    </div>
  );
}
