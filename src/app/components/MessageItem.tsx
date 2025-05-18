import React from "react";
import Image from "next/image";
import type { UIMessage } from "ai";

interface MessageItem extends UIMessage {
  time?: string;
  isLoading?: boolean;
}

export default function MessageItem(props: MessageItem) {
  const { role, content, toolInvocations, time, isLoading } = props;
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
      return false;
    }
  }

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

        {isLoading ? <LoadingDots /> : content && <p>{content as string}</p>}

        <span className="text-xs text-gray-300 mt-1 block text-right">
          {time}
        </span>
      </div>
    </div>
  );
}
function LoadingDots() {
  return (
    <span className="loading-dots flex space-x-1">
      <style jsx>{`
        .loading-dots span {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .loading-dots span:nth-child(1) {
          animation-delay: -0.32s;
        }
        .loading-dots span:nth-child(2) {
          animation-delay: -0.16s;
        }
        .loading-dots span:nth-child(3) {
          animation-delay: 0;
        }
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}
