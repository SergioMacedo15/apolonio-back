"use client";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";
import { SessionStorageKeys } from "@/storageKeys/sessionStorage";
import { useChat } from "@ai-sdk/react";
import type { ChatRequestOptions, UIMessage } from "ai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSessionStorage, useUpdateEffect } from "react-use";
import WinOverlay from "./WinOverlay";

type SessionChat = {
  chatSessionId: string;
  messages: UIMessage[];
};

export default function Chat() {
  const [sessionChat, setSessionChat] = useSessionStorage<
    SessionChat | undefined
  >(SessionStorageKeys.CURRENT_CHAT_SESSION_ID);
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

  const handleWinClick = () => {
    setShowWin(true);
  };

  const chatComponent = useChat({
    id: sessionChat?.chatSessionId,
    initialMessages: sessionChat?.messages,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'setCompletedInfo') {
        handleWinClick()
      }
    },
  });
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
    append,
    reload,
    stop,
    id,
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
      if (error) {
        stop();
        reload();
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
        "to cançada aqui vou da uma deitadinha depois nois termina ta bom obrigada viu ce me ajuda bem demais 😊",
    });
    setHasAppendedRestMessage(true);
  }

  function startChat() {
    append({
      id: String(Date.now()),
      role: "user",
      content: `Olá! Bem-vindo(a) ao nosso atendimento. Hoje é ${new Date().toLocaleDateString(
        "pt-BR"
      )}. Como posso ajudar?`,
    });
    reload();
  }

  useEffect(() => {
    if (!sessionChat || sessionChat.messages.length <= 0) {
      startChat();
    }
  }, []);

  useEffect(() => {
    if (error && !hasAppendedRestMessage) {
      if (typeof stop === "function") stop();
      controllErrorConnection();
    }
  }, [error, hasAppendedRestMessage, stop]);

  useUpdateEffect(() => {
    setSessionChat({
      chatSessionId: id,
      messages,
    });
  }, [id, messages]);

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
      <WinOverlay show={showWin} width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
