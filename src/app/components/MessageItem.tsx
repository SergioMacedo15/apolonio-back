import React from "react";
import Image from "next/image";
import type { MessageProps } from "@/services/chat";
import type { UIMessage } from "ai";

interface ImageContent {
  type: "image";
  url: string;
}

interface MessageItem extends UIMessage {
  time?: string;
}
export default function MessageItem(props: MessageItem) {
  const { role, content, toolInvocations, time } = props;
  const isMe = role === "user";

  function handleImagesComponente(tool: any) {
    try {
      if (!Array.isArray(tool)) {
        return false;
      }
      if (tool[0].result.type !== "Buffer") {
        return false;
      }
      const bufferData = tool[0].result.data;
      const buffer = Buffer.from(bufferData);
      const base64Image = buffer.toString("base64");
      return base64Image;
    } catch (error) {
      console.log(error);
    }
  }
  // Verificar se o conteúdo é uma imagem de maneira segura para o TypeScript
  // const isImage =
  //   typeof content === "object" &&
  //   content !== null &&
  //   "type" in content &&
  //   content.type === "image";

  // Obter a URL da imagem apenas se for uma imagem
  // const imageUrl = isImage ? (content as ImageContent).url : "";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[75%] p-3 rounded-lg ${
          isMe ? "bg-green-500" : "bg-gray-700"
        } text-white`}
      >
        {handleImagesComponente(toolInvocations) && (
          <div className="rounded-md overflow-hidden mb-2">
            <img
              src={`data:image/jpeg;base64,${handleImagesComponente(
                toolInvocations
              )}`}
              alt="Imagem"
            />
          </div>
        )}
        {content && <p>{content as string}</p>}
        <span className="text-xs text-gray-300 mt-1 block text-right">
          {time}
        </span>
      </div>
    </div>
  );
}
