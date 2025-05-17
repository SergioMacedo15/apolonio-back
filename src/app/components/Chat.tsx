import Image from "next/image";
import MessageInput from "@/app/components/MessageInput";

export default function Chat() {
  return (
    <div className="flex-1 relative h-full select-none">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover pointer-events-none"
      />

      <div className="absolute bottom-0 w-full">
        <MessageInput />
      </div>
    </div>
  );
}

