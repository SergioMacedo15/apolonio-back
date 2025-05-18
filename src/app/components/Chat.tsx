import Image from "next/image";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";
import type { UIMessage } from "ai";

interface ChatProps {
  onSend: (message: string) => void;
  messages: any[];
}
export default function Chat(props: ChatProps) {
  const { messages, onSend } = props;
  return (
    <div className="flex-1 relative h-full select-none">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover pointer-events-none"
      />
      <div className="absolute top-0 left-0 right-0 bottom-[60px] overflow-y-hidden">
        <MessageList />
      </div>
      <div className="absolute bottom-0 w-full">
        <MessageInput onClickToSend={onSend} />
      </div>
    </div>
  );
}
