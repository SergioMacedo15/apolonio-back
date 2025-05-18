import Image from "next/image";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";
import type { ChatRequestOptions, UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const chatComponent = useChat();
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } =
    chatComponent;
  console.log("chatComponent", messages);
  function submit(
    event?: { preventDefault?: (() => void) | undefined } | undefined,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) {
    try {
      handleSubmit(event, chatRequestOptions);
      console.log("evento marcado");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex-1 relative h-full select-none">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover pointer-events-none"
      />
      <div className="absolute top-0 left-0 right-0 bottom-[60px] overflow-y-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>
      <div className="absolute bottom-0 w-full">
        <MessageInput
          onChange={handleInputChange}
          input={input}
          onSend={submit}
        />
      </div>
    </div>
  );
}
