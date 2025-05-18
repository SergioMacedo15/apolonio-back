import Image from "next/image";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";
import type { UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const chatComponent = useChat();
  const { messages, input, handleInputChange, handleSubmit } = chatComponent;
  console.log(chatComponent);
  return (
    <div className="flex-1 relative h-full select-none">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover pointer-events-none"
      />
      <div className="absolute top-0 left-0 right-0 bottom-[60px] overflow-y-hidden">
        <MessageList messages={messages} />
      </div>
      <div className="absolute bottom-0 w-full">
        <MessageInput
          onChange={handleInputChange}
          input={input}
          onSend={handleSubmit}
        />
      </div>
    </div>
  );
}
