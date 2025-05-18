"use client";

import { useChat } from "@ai-sdk/react";
import { buffer } from "stream/consumers";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  console.log(messages);

  const processBufferResponse = (
    data: Partial<
      | {
          result: { type: string; data: any };
        }
      | undefined
    >
  ) => {
    try {
      if (!Array.isArray(data)) {
        return false;
      }
      if (data[0].result.type !== "Buffer") {
        return false;
      }
      const bufferData = data[0].result.data;
      const buffer = Buffer.from(bufferData);
      const base64Image = buffer.toString("base64");

      return base64Image;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch text-black">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
          {processBufferResponse(
            message?.toolInvocations as Partial<
              | {
                  result: { type: string; data: any };
                }
              | undefined
            >
          ) ? (
            <img
              src={`data:image/jpeg;base64,${processBufferResponse(
                message?.toolInvocations as Partial<
                  | {
                      result: { type: string; data: any };
                    }
                  | undefined
                >
              )}`}
              alt="Imagem"
            />
          ) : (
            ""
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 text-white bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
