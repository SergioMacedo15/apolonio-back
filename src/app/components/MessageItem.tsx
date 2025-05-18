import React from "react";
import Image from "next/image";

interface ImageContent {
  type: "image";
  url: string;
}

interface MessageItemProps {
  content: string | ImageContent;
  sender: "me" | "them";
  time: string;
}

export default function MessageItem({ content, sender, time }: MessageItemProps) {
  const isMe = sender === "me";
  
  // Verificar se o conteúdo é uma imagem de maneira segura para o TypeScript
  const isImage = typeof content === "object" && content !== null && 
                 "type" in content && content.type === "image";
  
  // Obter a URL da imagem apenas se for uma imagem
  const imageUrl = isImage ? (content as ImageContent).url : "";
  
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div 
        className={`max-w-[75%] p-3 rounded-lg ${
          isMe ? "bg-green-500" : "bg-gray-700"
        } text-white`}
      >
        {isImage ? (
          <div className="rounded-md overflow-hidden mb-2">
            <Image 
              src={imageUrl} 
              alt="Imagem compartilhada"
              width={300}
              height={200}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <p>{content as string}</p>
        )}
        <span className="text-xs text-gray-300 mt-1 block text-right">
          {time}
        </span>
      </div>
    </div>
  );
}