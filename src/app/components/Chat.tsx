import { useState, useEffect } from "react";
import Image from "next/image";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";
import type { ChatRequestOptions } from "ai";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const chatComponent = useChat();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
    append,
    metadata,
    stop,
  } = chatComponent;

  // Controle para evitar append repetido da mensagem de descanso
  const [hasAppendedRestMessage, setHasAppendedRestMessage] = useState(false);

  function submit(
    event?: { preventDefault?: (() => void) | undefined },
    chatRequestOptions?: ChatRequestOptions
  ) {
    try {
      if (!isLoading && !error) {
        handleSubmit(event, chatRequestOptions);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function controllErrorConnection() {
    append({
      id: String(Date.now()),
      role: "assistant",
      content:
        "Nossa, essa tarefa está me deixando cansada. Vou precisar de um tempinho para descansar, mas depois podemos continuar, tá bem? Obrigada pela ajuda até aqui! 😊",
    });
    setHasAppendedRestMessage(true);
  }

  useEffect(() => {
    if (error && !hasAppendedRestMessage) {
      if (typeof stop === "function") stop();
      controllErrorConnection();
    }
  }, [error, hasAppendedRestMessage, stop]);

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
