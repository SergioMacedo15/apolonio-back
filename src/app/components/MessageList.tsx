import MessageItem from "@/app/components/MessageItem";
import type { RoleAPIModel } from "@/services/sdk/types";
import type { UIMessage } from "ai";

interface UIMessageLoading extends UIMessage {
  isLoading?: boolean;
}
interface MessageListProps {
  messages: UIMessageLoading[];
  isLoading: boolean;
}

export default function MessageList(props: MessageListProps) {
  const { messages, isLoading } = props;
  const loadingMessage: UIMessageLoading = {
    id: "loading",
    content: "",
    role: "system",
    isLoading: true,
    parts: [],
  };

  const displayMessages = isLoading ? [...messages, loadingMessage] : messages;

  return (
    <div className="p-4 overflow-y-auto h-full">
      {displayMessages.map((msg, idx) => (
        <MessageItem key={idx} {...msg} />
      ))}
    </div>
  );
}
